const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const DAY_SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const KEY = 'school-helper-v1';
const QUARTERS = [{
  id: 1,
  name: 'I четверть',
  start: '2026-09-01',
  end: '2026-10-31'
}, {
  id: 2,
  name: 'II четверть',
  start: '2026-11-09',
  end: '2026-12-24'
}, {
  id: 3,
  name: 'III четверть',
  start: '2027-01-11',
  end: '2027-03-20'
}, {
  id: 4,
  name: 'IV четверть',
  start: '2027-03-29',
  end: '2027-05-25'
}];
const SUBJECTS = ['Допризывная подготовка/медицинская подготовка', 'Физика', 'Биология', 'Английский язык', 'География', 'История', 'Физическая культура и здоровье', 'Химия', 'Информатика', 'Белорусский язык', 'Русский язык', 'Русская литература', 'Белорусская литература', 'Математика', 'Астрономия'];
const defaultData = {
  lessons: [{
    day: 0,
    time: '08:30',
    subject: 'Допризывная подготовка/медицинская подготовка'
  }, {
    day: 0,
    time: '09:25',
    subject: 'Физика'
  }, {
    day: 0,
    time: '10:20',
    subject: 'Биология'
  }, {
    day: 0,
    time: '11:15',
    subject: 'Физика / английский язык / биология'
  }, {
    day: 0,
    time: '12:10',
    subject: 'География'
  }, {
    day: 0,
    time: '13:05',
    subject: 'История'
  }, {
    day: 0,
    time: '14:00',
    subject: 'Физическая культура и здоровье'
  }, {
    day: 1,
    time: '08:30',
    subject: 'Химия'
  }, {
    day: 1,
    time: '09:25',
    subject: 'Информатика/английский язык'
  }, {
    day: 1,
    time: '10:20',
    subject: 'Белорусский язык'
  }, {
    day: 1,
    time: '11:15',
    subject: 'Русская литература'
  }, {
    day: 1,
    time: '12:10',
    subject: 'Физическая культура и здоровье'
  }, {
    day: 1,
    time: '13:05',
    subject: 'Математика'
  }, {
    day: 1,
    time: '14:00',
    subject: 'Информатика/английский язык'
  }, {
    day: 2,
    time: '08:30',
    subject: 'Белорусская литература'
  }, {
    day: 2,
    time: '09:25',
    subject: 'Белорусский язык'
  }, {
    day: 2,
    time: '10:20',
    subject: 'Английский язык / английский язык'
  }, {
    day: 2,
    time: '11:15',
    subject: 'История'
  }, {
    day: 2,
    time: '12:10',
    subject: 'Физика'
  }, {
    day: 2,
    time: '13:05',
    subject: 'Математика'
  }, {
    day: 3,
    time: '08:30',
    subject: 'Математика'
  }, {
    day: 3,
    time: '09:25',
    subject: 'Математика / химия'
  }, {
    day: 3,
    time: '10:20',
    subject: 'Химия / математика'
  }, {
    day: 3,
    time: '11:15',
    subject: 'Русский язык'
  }, {
    day: 3,
    time: '12:10',
    subject: 'Физическая культура и здоровье'
  }, {
    day: 3,
    time: '13:05',
    subject: 'Русская литература'
  }, {
    day: 4,
    time: '08:30',
    subject: 'История'
  }, {
    day: 4,
    time: '09:25',
    subject: 'Английский язык / физика / биология'
  }, {
    day: 4,
    time: '10:20',
    subject: 'Биология'
  }, {
    day: 4,
    time: '11:15',
    subject: 'Математика / химия'
  }, {
    day: 4,
    time: '12:10',
    subject: 'Математика'
  }, {
    day: 4,
    time: '13:05',
    subject: 'Астрономия'
  }],
  grades: [],
  homework: [],
  quarterGrades: []
};
let data = loadData(),
  selectedDay = today(),
  homeworkFilter = 'active';
if (!data.lessons.length) data.lessons = defaultData.lessons.map(x => ({
  ...x
}));
data.lessons.forEach(x => {
  if (x.time === '08:30') x.time = '08:00';
  else if (x.time === '09:25') x.time = '09:00';
  else if (x.time === '10:20') x.time = '10:00';
  else if (x.time === '11:15') x.time = '11:00';
  else if (x.time === '12:10') x.time = '12:00';
  else if (x.time === '13:05') x.time = '13:00';
  else if (x.time === '14:00') x.time = '14:00'
});

function loadData() {
  try {
    return {
      ...defaultData,
      ...JSON.parse(localStorage.getItem(KEY) || '{}')
    }
  } catch {
    return structuredClone(defaultData)
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(data));
  render()
}

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  } [c]))
}

function dateLabel(d) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long'
  }).format(d)
}

function today() {
  let d = (new Date().getDay() + 6) % 7;
  return d < 6 ? d : 0
}

function average(rows) {
  return rows.length ? rows.reduce((s, r) => s + Number(r.score), 0) / rows.length : null
}

function roundGrade(value) {
  return Math.floor(value + 0.5)
}

function currentQuarter(row) {
  if (row.quarter !== undefined) return Number(row.quarter) === activeQuarter();
  const q = QUARTERS.find(q => row.date >= q.start && row.date <= q.end);
  return q?.id === activeQuarter()
}

function activeQuarter() {
  const date = new Date().toISOString().slice(0, 10);
  return QUARTERS.find(q => date >= q.start && date <= q.end)?.id || QUARTERS.find(q => date < q.start)?.id || 4
}

function empty(text) {
  return `<div class="empty-card">${text}</div>`
}

function render() {
  const now = new Date(),
    d = today(),
    next = (d + 1) % 6;
  document.querySelector('#today-date').textContent = `${DAY_SHORT[d]}, ${dateLabel(now)}`;
  const tomorrow = data.lessons.filter(x => x.day === next).sort((a, b) => a.time.localeCompare(b.time));
  const open = data.homework.filter(x => !x.done);
  const tips = [];
  for (const lesson of tomorrow) {
    const gs = data.grades.filter(g => g.subject.toLowerCase() === lesson.subject.toLowerCase()),
      avg = average(gs);
    if (avg !== null && avg < 7) tips.push({
      title: `Повтори ${lesson.subject}`,
      text: `Средний балл по предмету — ${avg.toFixed(1)}. Завтра ${lesson.time}${lesson.topic?`, тема: ${lesson.topic}`:''}.`
    });
    else if (lesson.topic) tips.push({
      title: `Подготовься к ${lesson.subject}`,
      text: `Завтра в ${lesson.time}: ${lesson.topic}. Выдели немного времени на повторение.`
    })
  }
  for (const g of data.grades) {
    const avg = average(data.grades.filter(x => x.subject.toLowerCase() === g.subject.toLowerCase()));
    if (avg !== null && avg < 6 && !tips.some(t => t.title.toLowerCase().includes(g.subject.toLowerCase()))) tips.push({
      title: `Подтяни ${g.subject}`,
      text: `Текущий средний балл — ${avg.toFixed(1)} из 10. Повтори последние темы и разбери ошибки.`
    })
  }
  document.querySelector('#suggestions').innerHTML = tips.length ? tips.slice(0, 3).map(t => `<div class="suggestion"><span class="suggestion-dot"></span><div><strong>${esc(t.title)}</strong><p>${esc(t.text)}</p></div></div>`).join('') : `<div class="empty-note"><span>✳</span><p>Добавь уроки и оценки — подскажу, что повторить перед занятиями.</p></div>`;
  const todayLessons = data.lessons.filter(x => x.day === d).sort((a, b) => a.time.localeCompare(b.time));
  document.querySelector('#today-lessons').innerHTML = todayLessons.length ? todayLessons.map(lessonCard).join('') : empty('На сегодня уроки пока не добавлены.');
  const soon = [...open].sort((a, b) => (a.due || '').localeCompare(b.due || '')).slice(0, 3);
  document.querySelector('#home-preview').innerHTML = soon.length ? soon.map(homeworkCard).join('') : empty('Новых заданий пока нет — хороший момент выдохнуть.');
  document.querySelector('#day-strip').innerHTML = DAY_SHORT.map((n, i) => `<button class="day-button ${i===selectedDay?'selected':''}" data-day="${i}"><span>${n}</span><strong>${DAYS[i].slice(0,2)}</strong></button>`).join('');
  const dayLessons = data.lessons.filter(x => x.day === selectedDay).sort((a, b) => a.time.localeCompare(b.time));
  document.querySelector('#schedule-list').innerHTML = dayLessons.length ? dayLessons.map(lessonCard).join('') : empty('Для этого дня уроки ещё не добавлены.');
  const qGrades = data.quarterGrades || [],
    quarterGrades = qGrades.filter(currentQuarter),
    allAvg = average(quarterGrades);
  document.querySelector('#overall-average').textContent = allAvg === null ? '—' : allAvg.toFixed(1);
  document.querySelector('#annual-forecast').innerHTML = [...new Set(qGrades.map(g => g.subject))].map(subject => {
    const rows = qGrades.filter(g => g.subject === subject),
      done = rows.length,
      avg = average(rows),
      remain = 4 - done,
      sum = rows.reduce((total, grade) => total + Number(grade.score), 0),
      needed = remain ? (38 - sum) / remain : 0,
      forecast = remain ? (sum + remain * avg) / 4 : avg,
      requiredSum = Math.ceil(38 - sum);
    const advice = done === 4 ? `Среднее ${avg.toFixed(2)} → годовая ${roundGrade(avg)}.` : needed <= 0 ? `Среднее сейчас ${ (sum / 4).toFixed(2)}: цель 10 уже обеспечена.` : needed <= 10 ? `Чтобы среднее было не ниже 9,5 и округлилось до 10, набери не меньше ${requiredSum} баллов за ${remain} четверти (в среднем ${needed.toFixed(2)}).` : `Даже если получать по 10, среднее не достигнет 9,5; оценки 10 всё равно повысят годовой результат.`;
    return `<div class="grade-card"><div class="grade-score">${roundGrade(forecast)}</div><div class="item-main"><strong>${esc(subject)}</strong><small>${done}/4 четвертей · прогнозное среднее ${forecast.toFixed(2)} · ${esc(advice)}</small></div></div>`
  }).join('') || empty('Добавь четвертные оценки, и здесь появится прогноз годового результата и план до цели 10.');
  const subjects = [...new Set(data.grades.map(g => g.subject))];
  document.querySelector('#grades-list').innerHTML = subjects.length ? subjects.map(subject => {
    const rows = data.grades.filter(g => g.subject === subject).sort((a, b) => b.date.localeCompare(a.date)),
      qRows = rows.filter(currentQuarter);
    return `<div class="grade-card"><div class="grade-score">${Number(rows[0].score)}</div><div class="item-main"><strong>${esc(subject)}</strong><small>${qRows.length?`${qRows.length} ${plural(qRows.length,'оценка','оценки','оценок')} за четверть`:'Нет оценок в этой четверти'}${rows[0].note?' · '+esc(rows[0].note):''}</small></div><span class="subject-average">${qRows.length?average(qRows).toFixed(1):'—'} / 10</span></div>`
  }).join('') : empty('Оценок пока нет. Добавь первую — средний балл за четверть посчитается автоматически.');
  const shown = data.homework.filter(x => homeworkFilter === 'done' ? x.done : !x.done).sort((a, b) => (a.due || '').localeCompare(b.due || ''));
  document.querySelector('#homework-list').innerHTML = shown.length ? shown.map(homeworkCard).join('') : empty(homeworkFilter === 'done' ? 'Готовые задания появятся здесь.' : 'Заданий нет — можно немного отдохнуть.');
}

function plural(n, a, b, c) {
  const m = n % 10,
    k = n % 100;
  return k >= 11 && k <= 14 ? c : m === 1 ? a : m >= 2 && m <= 4 ? b : c
}

function lessonCard(x) {
  return `<article class="lesson-card"><div class="time-badge">${esc(x.time)}</div><div class="item-main"><strong>${esc(x.subject)}</strong><small>${esc(x.topic||x.teacher||'Урок')}</small></div><span class="item-side">${x.teacher?esc(x.teacher):''}</span></article>`
}

function homeworkCard(x) {
  return `<article class="homework-card ${x.done?'done':''}"><button class="check-button" data-done="${x.id}" aria-label="Отметить готовым">${x.done?'✓':''}</button><div class="item-main"><strong>${esc(x.subject)}${x.title?': '+esc(x.title):''}</strong><small>${x.due?'Срок: '+dateLabel(new Date(x.due+'T12:00:00')):'Без срока'}${x.details?' · '+esc(x.details):''}</small></div></article>`
}
const dialog = document.querySelector('#entry-dialog'),
  fields = document.querySelector('#form-fields');
let entryType = '';

function subjectSelect(name = 'subject') {
  return `<label class="field"><span>Предмет</span><select name="${name}" required><option value="" disabled selected>Выбери предмет</option>${SUBJECTS.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join('')}</select></label>`
}

function openForm(type) {
  entryType = type;
  const configs = {
    lesson: ['НОВОЕ ЗАНЯТИЕ', 'Добавить урок', `${subjectSelect()}<div class="field-grid"><label class="field"><span>День</span><select name="day">${DAYS.map((d,i)=>`<option value="${i}" ${i===selectedDay?'selected':''}>${d}</option>`).join('')}</select></label><label class="field"><span>Время</span><input name="time" type="time" value="08:00" required></label></div><label class="field"><span>Тема / что повторить</span><input name="topic" placeholder="Например, квадратные уравнения"></label><label class="field"><span>Учитель (необязательно)</span><input name="teacher"></label>`],
    grade: ['НОВАЯ ОЦЕНКА', 'Добавить оценку', `${subjectSelect()}<div class="field-grid"><label class="field"><span>Оценка (1–10)</span><input name="score" type="number" min="1" max="10" required></label><label class="field"><span>Дата</span><input name="date" type="date" value="${new Date().toISOString().slice(0,10)}" required></label></div><label class="field"><span>Комментарий</span><input name="note" placeholder="Контрольная, ответ у доски…"></label>`],
    homework: ['НОВОЕ ЗАДАНИЕ', 'Добавить задание', `${subjectSelect()}<label class="field"><span>Что задали</span><input name="title" required placeholder="Параграф, упражнение…"></label><div class="field-grid"><label class="field"><span>Срок</span><input name="due" type="date"></label><label class="field"><span>Подробности</span><input name="details" placeholder="Стр. 42, № 5–7"></label></div>`]
  };
  const c = configs[type];
  document.querySelector('#dialog-kicker').textContent = c[0];
  document.querySelector('#dialog-title').textContent = c[1];
  fields.innerHTML = c[2];
  dialog.showModal()
}
document.querySelectorAll('.tab').forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));
document.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => activate(b.dataset.goto)));

function activate(tab) {
  document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === `view-${tab}`))
}
document.querySelector('#add-lesson').onclick = () => openForm('lesson');
document.querySelector('#add-grade').onclick = () => openForm('grade');
document.querySelector('#add-homework').onclick = () => openForm('homework');
document.querySelector('#add-quarter-grade').onclick = () => openQuarterForm();

function openQuarterForm() {
  entryType = 'quarter';
  document.querySelector('#dialog-kicker').textContent = 'ИТОГ ЧЕТВЕРТИ';
  document.querySelector('#dialog-title').textContent = 'Добавить четвертную';
  fields.innerHTML = `${subjectSelect()}<div class="field-grid"><label class="field"><span>Четверть</span><select name="quarter">${QUARTERS.map(q=>`<option value="${q.id}" ${q.id===activeQuarter()?'selected':''}>${q.name}</option>`).join('')}</select></label><label class="field"><span>Оценка (1–10)</span><input name="score" type="number" min="1" max="10" required></label></div>`;
  dialog.showModal()
}
document.querySelector('#cancel-dialog').onclick = () => dialog.close();
document.querySelector('#close-dialog').onclick = () => dialog.close();
document.querySelector('#entry-form').addEventListener('submit', e => {
  e.preventDefault();
  const f = Object.fromEntries(new FormData(e.currentTarget));
  if (entryType === 'lesson') data.lessons.push({
    ...f,
    day: Number(f.day),
    id: crypto.randomUUID()
  });
  if (entryType === 'grade') data.grades.push({
    ...f,
    score: Number(f.score),
    id: crypto.randomUUID()
  });
  if (entryType === 'quarter') {
    data.quarterGrades ??= [];
    data.quarterGrades = data.quarterGrades.filter(g => !(g.subject.toLowerCase() === f.subject.toLowerCase() && Number(g.quarter) === Number(f.quarter)));
    data.quarterGrades.push({
      ...f,
      quarter: Number(f.quarter),
      score: Number(f.score),
      id: crypto.randomUUID()
    })
  }
  if (entryType === 'homework') data.homework.push({
    ...f,
    done: false,
    id: crypto.randomUUID()
  });
  save();
  dialog.close()
});
document.querySelector('#day-strip').addEventListener('click', e => {
  const b = e.target.closest('[data-day]');
  if (b) {
    selectedDay = Number(b.dataset.day);
    render()
  }
});
document.querySelectorAll('.filter').forEach(b => b.onclick = () => {
  homeworkFilter = b.dataset.filter;
  document.querySelectorAll('.filter').forEach(x => x.classList.toggle('active', x === b));
  render()
});
document.addEventListener('click', e => {
  const b = e.target.closest('[data-done]');
  if (b) {
    const item = data.homework.find(x => x.id === b.dataset.done);
    if (item) item.done = !item.done;
    save()
  }
});
let tg = null;
if (window.Telegram?.WebApp) {
  tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
  document.documentElement.style.setProperty('--tg-bg', tg.themeParams.bg_color || '#f5f5f7');
  const shortcutButton = document.querySelector('#shortcut-button');
  if (tg.isVersionAtLeast?.('8.0') && typeof tg.checkHomeScreenStatus === 'function') {
    tg.checkHomeScreenStatus(status => {
      shortcutButton.hidden = status === 'added' || status === 'unsupported'
    });
    shortcutButton.addEventListener('click', () => {
      if (typeof tg.addToHomeScreen === 'function') tg.addToHomeScreen()
    });
    tg.onEvent?.('homeScreenAdded', () => {
      shortcutButton.hidden = true
    });
  } else shortcutButton.hidden = true;
}
render();
