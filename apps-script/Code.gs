/**
 * Приём заявок с сайта Counsel Office в Google Таблицу.
 *
 * Скрипт привязан к таблице (Расширения → Apps Script) и развёрнут как веб-приложение
 * с доступом «Все». Сайт шлёт POST с JSON в теле (Content-Type: text/plain),
 * скрипт проверяет поля и добавляет строку на лист «Заявки».
 */

const SHEET_NAME = 'Заявки';
const HEADERS = ['Дата', 'Имя', 'Телефон', 'Способ связи', 'Направление', 'Описание', 'Страница'];
const CONTACT_METHODS = { phone: 'Телефон', telegram: 'Telegram', email: 'Email' };
const LIMITS = { name: 100, phone: 30, practiceArea: 100, description: 2000, page: 200 };

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const row = toRow(data);
    if (!row) {
      return json({ ok: false, error: 'invalid' });
    }

    // Защищает от одновременной записи двух заявок в одну строку
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      getSheet().appendRow(row);
    } finally {
      lock.releaseLock();
    }

    return json({ ok: true });
  } catch (error) {
    console.error(error);
    return json({ ok: false, error: 'server' });
  }
}

function toRow(data) {
  const name = clean(data.name, LIMITS.name);
  const phone = clean(data.phone, LIMITS.phone);
  const digits = phone.replace(/\D/g, '');
  const contactMethod = CONTACT_METHODS[data.contactMethod];

  if (name.length < 2 || digits.length < 10 || !contactMethod) {
    return null;
  }

  return [
    new Date(),
    name,
    phone,
    contactMethod,
    clean(data.practiceArea, LIMITS.practiceArea),
    clean(data.description, LIMITS.description),
    clean(data.page, LIMITS.page),
  ];
}

/** Обрезает строку и экранирует начало формулы, чтобы таблица не выполнила чужой код. */
function clean(value, maxLength) {
  const text = String(value == null ? '' : value)
    .trim()
    .slice(0, maxLength);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
