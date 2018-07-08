export default function(str) {
  let newStr = [];
  for (let i = 0; i < str.length; i++) if (str[i] !== "") newStr.push(str[i]);
  return newStr;
}
