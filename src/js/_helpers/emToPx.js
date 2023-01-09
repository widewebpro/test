const emToPx = (em) => {
  return parseFloat(em) * parseFloat(getComputedStyle(document.body).fontSize);
}

export default emToPx;