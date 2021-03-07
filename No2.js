
function solution(N, users) {

    // Sort users by stage number ascending
    // Output [1, 2, 2, 3, ...]
    let sortedUsers = [...users].sort((a, b) => a - b);

    // Store number of total user and uncleared user for every stage
    // Output { stage level: [ uncleared user, total user ] } 
    var stages = {};
    var start = 0;

    // Iterate for every stage levet to N
    for (let stageLevel=1; stageLevel<=N; stageLevel++) {
        stages[stageLevel] = [0, sortedUsers.length];

        // Iterate user in certain stage (stageNum) and get number of uncleared user
        for (let i=start; i<sortedUsers.length; i++) {
            if (sortedUsers[i] === stageLevel) {
                stages[stageLevel][0] += 1;
            } else {
                start=i;
                break;
            }
        }

        // Calculate total user using previous stage value
        if (stageLevel>1) {
            stages[stageLevel][1] = stages[stageLevel-1][1] - stages[stageLevel-1][0]; 
        }

    }

    // Calculate failure rate of each stage
    failureRate = Object.keys(stages).map(stage => ([parseInt(stage), stages[stage][0] / stages[stage][1]]));
    // Sort failure rate desc
    var answer = failureRate.sort((a,b) => b[1] - a[1]).map(i => i[0]);
    return answer;
}

console.log(solution(5,[2,1,2,6,2,4,3,3]));
console.log(solution(4,[4,4,4,4,4]));