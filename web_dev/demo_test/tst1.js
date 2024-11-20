var isValid = function(s) {
    const arr = [];
    for (let i = 0; i < s.length; i++) {
        if ((s[i] == "(") || (s[i] == "[") || (s[i] == "{")) {
            arr.push(s[i]);
        }
        else if ((arr.length != 0) && (((s[i] == ")") && (arr[arr.length - 1] == "(")) || ((s[i] == "]") && (arr[arr.length - 1] == "[")) || ((s[i] == "}") && (arr[arr.length - 1] == "{")))) {
            arr.pop();
        }
        else {
            arr.push(s[i]);
        }
    }
    if (arr.length == 0) {
        return true;
    }
    else {
        return false;
    }
};
s = "()";
console.log(isValid(s));