// Get all combination of every column index in relation
// Combinations must be sorted in order to select "0" as a potential
// candidate key first rather than "012"
// Output ['0','1','2','3','01', ..., '123', '0123']
function getCombinations(chars) {
    var result = [];
    var f = function(prefix, chars) {
      for (var i = 0; i < chars.length; i++) {
        result.push(prefix + chars[i]);
        f(prefix + chars[i], chars.slice(i + 1));
      }
    }
    f('', chars);
    return result.sort((a,b)=>a.length-b.length);
  }

// To check combination's minimality, we have to make sure a candidate key is 
// not a subset of the combination. For example "02" is a subset of "012" so 
// "02" is not minimal. Output true or false
function isMinimal(key,candidateKeys) {
  for (let ck of candidateKeys) {
      if (Array.from(new Set(key.concat(ck))).length == Array.from(new Set(key)).length) return false;
  } 
  return true;
}

// To solve this problem there is four step to accomplish
// 1. Find every unique combination of a relation's columns index
// 2. Check every unique combination whether its a minimal combination or not
// 3. If a combination is minimal then check its uniqueness
// 4. If a combination is unique then add it to candidate keys

function solution(relation) {
  var candidateKeys = [];
  var columnIndexArray = [...Array(relation[0].length).keys()]; // [0,1,2,3]
  var combinations = getCombinations(columnIndexArray); // ['0', ..., '123', '0123']

  // Iterate over combinations and check key's minimality and uniqueness 
  combinations.forEach(combination => {

    // If combination is minimal then check its uniqueness
    if (isMinimal(combination,candidateKeys)) {

      let relationJoined = relation.map(row => {
        let tempRow = [];
        combination.split("").forEach(i => {
          tempRow.push(row[i]);
        })
        return tempRow.join("");
      });

      // If a key is unique then add it into candidate keys
      if ((new Set(relationJoined)).size === relationJoined.length) {
        candidateKeys.push(combination);
      }
    }
  
  });

  var answer = candidateKeys.length;
  return answer;
}

console.log(solution(
  [["100","ryan","music","2"],["200","apeach","math","2"],["300","tube","computer","3"],["400","con","computer","4"],["500","muzi","music","3"],["600","apeach","music","2"]]))