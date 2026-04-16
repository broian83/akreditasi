/**
 * 🏥 TEMPLATE AKREDITASI RS - GOOGLE APPS SCRIPT
 * 
 * Backend untuk tracking kelengkapan dokumen akreditasi
 * Versi: 1.0.0
 * 
 * Fitur:
 * - CRUD Dokumen
 * - Auto-generate ID
 * - Reminder deadline
 * - Export laporan
 * - Web App UI
 */

// ============================================
// CONFIG & SETUP
// ============================================

const CONFIG = {
  SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet().getId(),
  SHEET_NAMES: {
    DATA_DOKUMEN: 'DATA DOKUMEN',
    STANDAR: 'STANDAR AKREDITASI',
    TIM: 'TIM AKREDITASI',
    TIMELINE: 'TIMELINE & DEADLINE',
    SETTINGS: 'SETTINGS',
    DASHBOARD: 'DASHBOARD'
  },
  REMINDER_HARI: 7, // Default H-7 reminder
  FONNTE_API: 'https://api.fonnte.com/send',
  TIMEZONE: 'Asia/Jakarta'
};

// ============================================
// INITIALIZATION - Buat sheets jika belum ada
// ============================================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🏥 Akreditasi RS')
    .addItem('📊 Buka Dashboard', 'showDashboard')
    .addItem('➕ Tambah Dokumen', 'showAddDocumentForm')
    .addItem('📤 Export Laporan', 'exportLaporan')
    .addItem('🔔 Cek Reminder', 'checkReminders')
    .addItem('⚙️ Setup Awal', 'setupSheets')
    .addToUi();
}

function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  
  // Check jika sheets sudah ada
  const sheets = ss.getSheets();
  const sheetNames = sheets.map(s => s.getName());
  
  const requiredSheets = [
    CONFIG.SHEET_NAMES.DATA_DOKUMEN,
    CONFIG.SHEET_NAMES.STANDAR,
    CONFIG.SHEET_NAMES.TIM,
    CONFIG.SHEET_NAMES.TIMELINE,
    CONFIG.SHEET_NAMES.SETTINGS,
    CONFIG.SHEET_NAMES.DASHBOARD
  ];
  
  const missingSheets = requiredSheets.filter(name => !sheetNames.includes(name));
  
  if (missingSheets.length === 0) {
    ui.alert('✅ Semua sheets sudah ada! Setup sudah lengkap.');
    return;
  }
  
  // Buat sheets yang belum ada
  missingSheets.forEach(name => {
    const newSheet = ss.insertSheet(name);
    setupSheetHeaders(newSheet);
  });
  
  // Isi data standar SNARS (contoh)
  isiDataStandarContoh();
  
  // Isi settings default
  isiSettingsDefault();
  
  ui.alert(`✅ Setup selesai! ${missingSheets.length} sheet berhasil dibuat.`);
}

function setupSheetHeaders(sheet) {
  const sheetName = sheet.getName();
  
  switch(sheetName) {
    case 'DATA DOKUMEN':
      const docHeaders = [
        'ID Dokumen', 'Nama Dokumen', 'BAB', 'Standar', 'Kriteria',
        'Status Kelengkapan', 'Skor Self-Assessment', 'PIC',
        'Deadline', 'Link File', 'Tanggal Upload', 'Last Updated', 'Catatan'
      ];
      sheet.getRange(1, 1, 1, docHeaders.length).setValues([docHeaders])
           .setFontWeight('bold')
           .setBackground('#22c55e')
           .setFontColor('#ffffff');
      setupDataValidation(sheet);
      break;
      
    case 'STANDAR AKREDITASI':
      const standarHeaders = [
        'BAB', 'Nama BAB', 'Kode Standar', 'Nama Standar',
        'Kode Kriteria', 'Nama Kriteria', 'Bobot', 'Status'
      ];
      sheet.getRange(1, 1, 1, standarHeaders.length).setValues([standarHeaders])
           .setFontWeight('bold')
           .setBackground('#eab308')
           .setFontColor('#ffffff');
      break;
      
    case 'TIM AKREDITASI':
      const timHeaders = [
        'Nama', 'Jabatan', 'Role', 'Email', 'No. WhatsApp',
        'Dokumen Ditugaskan', 'Total Dokumen', 'Selesai', 'Progress'
      ];
      sheet.getRange(1, 1, 1, timHeaders.length).setValues([timHeaders])
           .setFontWeight('bold')
           .setBackground('#3b82f6')
           .setFontColor('#ffffff');
      break;
      
    case 'TIMELINE & DEADLINE':
      const timelineHeaders = [
        'Milestone', 'Tanggal Mulai', 'Deadline', 'PIC',
        'Status', 'Progress', 'Catatan'
      ];
      sheet.getRange(1, 1, 1, timelineHeaders.length).setValues([timelineHeaders])
           .setFontWeight('bold')
           .setBackground('#8b5cf6')
           .setFontColor('#ffffff');
      break;
      
    case 'SETTINGS':
      const settingsData = [
        ['PENGATURAN', ''],
        ['Nama Rumah Sakit', ''],
        ['Tipe Akreditasi', 'SNARS'],
        ['Target Akreditasi', ''],
        ['', ''],
        ['Reminder Aktif?', 'Ya'],
        ['H-berapa Reminder?', 7],
        ['Fonnte API URL', CONFIG.FONNTE_API],
        ['Fonnte Token', '']
      ];
      sheet.getRange(1, 1, settingsData.length, 2).setValues(settingsData)
           .setFontWeight('bold');
      break;
  }
  
  // Freeze header row
  sheet.setFrozenRows(1);
}

function setupDataValidation(sheet) {
  // Status Kelengkapan dropdown
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Belum Mulai', 'Draft', 'Review', 'Lengkap'])
    .setAllowInvalid(false)
    .build();
  sheet.getRange('F2:F').setDataValidation(statusRule);
  
  // Skor dropdown
  const skorRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['1', '2', '3', '4'])
    .setAllowInvalid(false)
    .build();
  sheet.getRange('G2:G').setDataValidation(skorRule);
}

// ============================================
// AUTO-SETUP - Ensure sheets exist sebelum akses
// ============================================

function ensureSheetsExist() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheets = ss.getSheets();
  const sheetNames = sheets.map(s => s.getName());
  
  const requiredSheets = [
    CONFIG.SHEET_NAMES.DATA_DOKUMEN,
    CONFIG.SHEET_NAMES.STANDAR,
    CONFIG.SHEET_NAMES.TIM,
    CONFIG.SHEET_NAMES.TIMELINE,
    CONFIG.SHEET_NAMES.SETTINGS,
    CONFIG.SHEET_NAMES.DASHBOARD
  ];
  
  const missingSheets = requiredSheets.filter(name => !sheetNames.includes(name));
  
  if (missingSheets.length > 0) {
    missingSheets.forEach(name => {
      const newSheet = ss.insertSheet(name);
      setupSheetHeaders(newSheet);
    });
    
    // Isi data standar & settings
    isiDataStandarContoh();
    isiSettingsDefault();
    
    Logger.log(`Auto-created ${missingSheets.length} sheets`);
  }
}

// ============================================
// CRUD DOKUMEN
// ============================================

function tambahDokumen(data) {
  try {
    ensureSheetsExist();
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DATA_DOKUMEN);
    
    // Generate ID otomatis - hitung dokumen yang ada
    const lastRow = sheet.getLastRow();
    const newId = `DOC-${String(lastRow).padStart(3, '0')}`;
    
    const now = new Date();
    // Konversi deadline string ke Date object jika perlu agar masuk ke Sheet sebagai Date
    let deadlineDate = data.deadline;
    if (typeof deadlineDate === 'string' && deadlineDate.includes('-')) {
      deadlineDate = new Date(deadlineDate);
    }

    const rowData = [
      newId,
      data.nama,
      data.bab,
      data.standar,
      data.kriteria,
      data.status || 'Belum Mulai',
      data.skor || '',
      data.pic,
      deadlineDate,
      data.link || '',
      now,
      now,
      data.catatan || ''
    ];
    
    sheet.appendRow(rowData);
    SpreadsheetApp.flush(); // Paksa write ke sheet
    Logger.log('Success: Dokumen ditambahkan dengan ID ' + newId);
    return { success: true, id: newId };
  } catch (e) {
    Logger.log('Error in tambahDokumen: ' + e.message);
    return { success: false, error: e.message };
  }
}

function updateDokumen(id, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DATA_DOKUMEN);
  const dataRange = sheet.getDataRange().getValues();
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === id) {
      const row = i + 1;
      
      if (data.nama) sheet.getRange(row, 2).setValue(data.nama);
      if (data.bab) sheet.getRange(row, 3).setValue(data.bab);
      if (data.standar) sheet.getRange(row, 4).setValue(data.standar);
      if (data.kriteria) sheet.getRange(row, 5).setValue(data.kriteria);
      if (data.status) sheet.getRange(row, 6).setValue(data.status);
      if (data.skor) sheet.getRange(row, 7).setValue(data.skor);
      if (data.pic) sheet.getRange(row, 8).setValue(data.pic);
      if (data.deadline) sheet.getRange(row, 9).setValue(data.deadline);
      if (data.link) sheet.getRange(row, 10).setValue(data.link);
      if (data.catatan) sheet.getRange(row, 13).setValue(data.catatan);
      
      sheet.getRange(row, 12).setValue(new Date()); // Last Updated
      return { success: true };
    }
  }
  
  return { success: false, error: 'Dokumen tidak ditemukan' };
}

function hapusDokumen(id) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DATA_DOKUMEN);
  const dataRange = sheet.getDataRange().getValues();
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === id) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  
  return { success: false, error: 'Dokumen tidak ditemukan' };
}

function getDokumen(id) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DATA_DOKUMEN);
  const dataRange = sheet.getDataRange().getValues();
  
  for (let i = 1; i < dataRange.length; i++) {
    if (dataRange[i][0] === id) {
      return {
        success: true,
        data: {
          id: dataRange[i][0],
          nama: dataRange[i][1],
          bab: dataRange[i][2],
          standar: dataRange[i][3],
          kriteria: dataRange[i][4],
          status: dataRange[i][5],
          skor: dataRange[i][6],
          pic: dataRange[i][7],
          deadline: dataRange[i][8],
          link: dataRange[i][9],
          tanggalUpload: dataRange[i][10],
          lastUpdated: dataRange[i][11],
          catatan: dataRange[i][12]
        }
      };
    }
  }
  
  return { success: false, error: 'Dokumen tidak ditemukan' };
}

function getAllDokumen() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DATA_DOKUMEN);
    if (!sheet) {
      Logger.log('Error: Sheet DATA DOKUMEN tidak ditemukan');
      return [];
    }
    
    // Gunakan getRange daripada getDataRange untuk kontrol lebih baik
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) return []; // Hanya header
    
    const dataRange = sheet.getRange(2, 1, lastRow - 1, 13).getValues();
    
    const dokumen = [];
    for (let i = 0; i < dataRange.length; i++) {
      if (!dataRange[i][0]) continue; // Skip jika ID kosong
      
      dokumen.push({
        id: dataRange[i][0],
        nama: dataRange[i][1],
        bab: dataRange[i][2],
        standar: dataRange[i][3],
        kriteria: dataRange[i][4],
        status: dataRange[i][5],
        skor: dataRange[i][6],
        pic: dataRange[i][7],
        deadline: dataRange[i][8],
        link: dataRange[i][9]
      });
    }
    
    Logger.log('Success: Fetched ' + dokumen.length + ' dokumen');
    return dokumen;
  } catch (e) {
    Logger.log('Error in getAllDokumen: ' + e.message);
    throw e;
  }
}

// ============================================
// DASHBOARD & REPORTING
// ============================================

function getDashboardData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DATA_DOKUMEN);
  const dataRange = sheet.getDataRange().getValues();
  
  let total = 0;
  let lengkap = 0;
  let draft = 0;
  let review = 0;
  let belumMulai = 0;
  
  const perBab = {};
  
  for (let i = 1; i < dataRange.length; i++) {
    total++;
    const status = dataRange[i][5];
    const bab = dataRange[i][2];
    
    if (status === 'Lengkap') lengkap++;
    else if (status === 'Draft') draft++;
    else if (status === 'Review') review++;
    else belumMulai++;
    
    if (!perBab[bab]) {
      perBab[bab] = { total: 0, lengkap: 0 };
    }
    perBab[bab].total++;
    if (status === 'Lengkap') perBab[bab].lengkap++;
  }
  
  return {
    total: total,
    lengkap: lengkap,
    draft: draft,
    review: review,
    belumMulai: belumMulai,
    persentase: total > 0 ? Math.round((lengkap / total) * 100) : 0,
    perBab: perBab
  };
}

function exportLaporan() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const dashboardData = getDashboardData();
  
  // Buat sheet temporary untuk laporan
  let laporanSheet = ss.getSheetByName('LAPORAN');
  if (!laporanSheet) {
    laporanSheet = ss.insertSheet('LAPORAN');
  } else {
    laporanSheet.clear();
  }
  
  // Header
  const settingsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.SETTINGS);
  const rsName = settingsSheet.getRange('B3').getValue() || 'Rumah Sakit';
  
  laporanSheet.getRange('A1:F1').merge();
  laporanSheet.getRange('A1').setValue(`LAPORAN AKREDITASI - ${rsName}`)
             .setFontWeight('bold')
             .setFontSize(14)
             .setHorizontalAlignment('center');
  
  laporanSheet.getRange('A3').setValue('Tanggal Export');
  laporanSheet.getRange('B3').setValue(new Date());
  
  laporanSheet.getRange('A5').setValue('Total Dokumen');
  laporanSheet.getRange('B5').setValue(dashboardData.total);
  
  laporanSheet.getRange('A6').setValue('Dokumen Lengkap');
  laporanSheet.getRange('B6').setValue(dashboardData.lengkap);
  
  laporanSheet.getRange('A7').setValue('Persentase Kelengkapan');
  laporanSheet.getRange('B7').setValue(`${dashboardData.persentase}%`);
  
  // Copy data dokumen
  const dataSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DATA_DOKUMEN);
  const dataRange = dataSheet.getDataRange();
  dataRange.copyTo(laporanSheet.getRange('A10'));
  
  // Export ke PDF
  const pdfBlob = ss.getAs('application/pdf');
  const folder = DriveApp.getRootFolder();
  const file = folder.createFile(pdfBlob).setName(`Laporan Akreditasi - ${new Date().toISOString().split('T')[0]}`);
  
  return {
    success: true,
    url: file.getUrl(),
    message: 'Laporan berhasil di-export!'
  };
}

// ============================================
// REMINDER SYSTEM
// ============================================

function checkReminders() {
  ensureSheetsExist();
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.SETTINGS);
  
  const reminderActive = settingsSheet.getRange('B7').getValue() === 'Ya';
  if (!reminderActive) {
    return { success: false, message: 'Reminder tidak aktif' };
  }
  
  const hReminder = parseInt(settingsSheet.getRange('B8').getValue()) || 7;
  const fonnteToken = settingsSheet.getRange('B10').getValue();
  
  const today = new Date();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.DATA_DOKUMEN);
  const dataRange = sheet.getDataRange().getValues();
  
  const reminders = [];
  
  for (let i = 1; i < dataRange.length; i++) {
    const deadline = new Date(dataRange[i][8]);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= hReminder && diffDays >= 0 && dataRange[i][5] !== 'Lengkap') {
      reminders.push({
        id: dataRange[i][0],
        nama: dataRange[i][1],
        pic: dataRange[i][7],
        deadline: deadline,
        hariTersisa: diffDays
      });
    }
  }
  
  // Send WA via Fonnte
  if (reminders.length > 0 && fonnteToken) {
    reminders.forEach(reminder => {
      const message = `🏥 *REMINDER AKREDITASI*\n\n` +
        `Dokumen: ${reminder.nama}\n` +
        `PIC: ${reminder.pic}\n` +
        `Deadline: ${reminder.deadline.toLocaleDateString('id-ID')}\n` +
        `Sisa: ${reminder.hariTersisa} hari\n\n` +
        `Segera lengkapi dokumen ini!`;
      
      // Send ke PIC (jika ada nomor WA)
      sendWA(reminder.pic, message, fonnteToken);
    });
  }
  
  return {
    success: true,
    count: reminders.length,
    reminders: reminders
  };
}

function sendWA(nama, pesan, token) {
  // Cari nomor WA dari sheet TIM
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const timSheet = ss.getSheetByName(CONFIG.SHEET_NAMES.TIM);
  const timData = timSheet.getDataRange().getValues();
  
  let phoneNumber = null;
  for (let i = 1; i < timData.length; i++) {
    if (timData[i][0] === nama) {
      phoneNumber = timData[i][4]; // Kolom E = No. WhatsApp
      break;
    }
  }
  
  if (!phoneNumber) return;
  
  // Format nomor (08 -> 628)
  phoneNumber = phoneNumber.replace(/^0/, '62');
  
  // Send via Fonnte API
  const payload = {
    'target': phoneNumber,
    'message': pesan,
    'countryCode': '62'
  };
  
  const options = {
    'method': 'post',
    'headers': {
      'Authorization': token
    },
    'payload': payload
  };
  
  try {
    UrlFetchApp.fetch(CONFIG.FONNTE_API, options);
    Logger.log(`WA terkirim ke ${nama}`);
  } catch (e) {
    Logger.log(`Error kirim WA: ${e.message}`);
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function isiDataStandarContoh() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.STANDAR);
  if (!sheet) return;
  
  // Contoh data SNARS (bisa diganti dengan standar yang sebenarnya)
  const contohData = [
    [1, 'Pengkajian Pasien', 'STK-01', 'Pengkajian Pasien', 'KRT-01', 'Ada prosedur pengkajian', 10, 'Belum'],
    [1, 'Pengkajian Pasien', 'STK-01', 'Pengkajian Pasien', 'KRT-02', 'Pengkajian dilakukan sesuai', 10, 'Belum'],
    [2, 'Pelayanan Pasien', 'STK-02', 'Pelayanan Pasien', 'KRT-01', 'Ada prosedur pelayanan', 15, 'Belum'],
    [3, 'Manajemen Risiko', 'STK-03', 'Manajemen Risiko', 'KRT-01', 'Ada program manajemen risiko', 12, 'Belum']
  ];
  
  if (contohData.length > 0) {
    sheet.getRange(2, 1, contohData.length, contohData[0].length).setValues(contohData);
  }
}

function isiSettingsDefault() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAMES.SETTINGS);
  if (!sheet) return;
  
  // Already filled in setupSheetHeaders
  Logger.log('Settings sudah diisi default');
}

function showDashboard() {
  const html = HtmlService.createHtmlOutputFromFile('Dashboard')
    .setTitle('Dashboard Akreditasi RS')
    .setWidth(900)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, '📊 Dashboard Akreditasi');
}

function showAddDocumentForm() {
  const html = HtmlService.createHtmlOutputFromFile('FormDokumen')
    .setTitle('Tambah Dokumen')
    .setWidth(600)
    .setHeight(700);
  SpreadsheetApp.getUi().showModalDialog(html, '➕ Tambah Dokumen Baru');
}

// ============================================
// WEB APP - doGet untuk deploy
// ============================================

function doGet() {
  return HtmlService.createHtmlOutputFromFile('WebApp')
    .setTitle('Akreditasi RS - Web App')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ============================================
// TRIGGERS - Setup time-driven triggers
// ============================================

function createRemindersTrigger() {
  // Hapus trigger lama jika ada
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'checkReminders') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Buat trigger baru - jalan setiap hari jam 8 pagi
  ScriptApp.newTrigger('checkReminders')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  
  Logger.log('Trigger reminder sudah dibuat!');
}
