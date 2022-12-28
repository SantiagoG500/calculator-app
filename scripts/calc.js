const screenLastOP = document.getElementById('last-op-screen');
const screenCurrentOp = document.getElementById('current-op-screen');

let currentValue = '';
let lastValue = '';
let operator = undefined;
let shouldReset = false;
let result = 0;

export const checkClick = (e) => {
  const target = e.target;
  const dataBtn = target.dataset.typeBtn;
  const value = target.value;

  if (!dataBtn) return;

  const OPTIONS = {
    number: () => writeNum(value),
    operator: () => setOPerator(value),
    decimal: () => writeDecimal(value),
    action: () => {
      if (value === '=') operate();
      if (value === 'delete') deleteString();
      if (value === 'reset') resetOP();
      if (value === 'invert') invertSign();
    },
  };
  if (OPTIONS[dataBtn]) OPTIONS[dataBtn]();
};
export const checkKey = (e) => {
  const key = e.key;

  if (!isNaN(+key)) return writeNum(key);
  const OPTIONS = {
    Backspace: () => deleteString(),
    Enter: () => operate(),
    r: () => resetOP(),
    i: () => invertSign(),
    '.': () => writeDecimal(key),
    '+': () => setOPerator(key),
    '-': () => setOPerator(key),
    '*': () => setOPerator(key),
    '/': () => setOPerator(key),
  };
  if (OPTIONS[key]) OPTIONS[key]();
};

const writeNum = (value) => {
  if (shouldReset === true) resetOP();
  currentValue += value;
  screenCurrentOp.textContent = currentValue;
};

const writeDecimal = () => {
  const regExp = /[0-9]/gm;

  if (currentValue.includes('.')) return;
  if (!currentValue.match(regExp) && currentValue === '-') currentValue += '0.';
  if (!currentValue.match(regExp)) currentValue = '0.';
  if (!currentValue.includes('.')) currentValue += '.';
  screenCurrentOp.textContent = currentValue;
};

const setOPerator = (value) => {
  if (currentValue === '-') return;
  if (lastValue === '') lastValue = currentValue;
  if (operator !== undefined) operate();
  if (shouldReset === true) resetOP();
  if (lastValue === '' && currentValue === '') return;
  if (currentValue !== '') lastValue = currentValue;

  currentValue = '';
  operator = value;

  screenLastOP.textContent = `${lastValue} ${operator}`;
  screenCurrentOp.textContent = currentValue;
};
const operate = () => {
  if (lastValue === '' || currentValue === '') return;
  if (operator === undefined) return;

  const OPS = {
    '+': () => (result = Number(lastValue) + Number(currentValue)),
    '-': () => (result = Number(lastValue) - Number(currentValue)),
    '*': () => (result = Number(lastValue) * Number(currentValue)),
    '/': () => {
      result = Number(lastValue) / Number(currentValue);
      if (!isFinite(result)) {
        result = "You can't divide by 0!!!";
        shouldReset = true;
      }
    },
  };
  if (OPS[operator]) OPS[operator]();

  screenLastOP.textContent = `${lastValue} ${operator} ${currentValue} =`;
  result = checkAnswer(result);
  screenCurrentOp.textContent = result;

  lastValue = `${result}`;
  currentValue = '';
  result = 0;
  operator = undefined;
};
const deleteString = () => {
  currentValue = currentValue.slice(0, -1);
  screenCurrentOp.textContent = currentValue;
};
const resetOP = () => {
  currentValue = '';
  lastValue = '';
  operator = undefined;
  shouldReset = false;

  screenCurrentOp.textContent = currentValue;
  screenLastOP.textContent = lastValue;
};
const invertSign = () => {
  if (currentValue.includes('-')) currentValue = currentValue.replace('-', '');
  else currentValue = `-${currentValue}`;
  screenCurrentOp.textContent = currentValue;
};

const checkAnswer = (value) => {
  if (value === "You can't divide by 0!!!") return result;
  if (!Number.isInteger(value)) return Number(value).toFixed(4);
  if (Number.isInteger(value)) return result;
};
