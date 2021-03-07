function solution(record) {

    // Object to store user as unique userID
    // Example {uid4567: "Prodo"}
    var userList = {};

    // Iterate over the record, add user to if not exist in UserList
    // and change the nickname for some certain condition
    record.forEach(element => {
        let [action, userID, nickname] = element.split(' ');
        
        // If user hasn't in userList then add user into userList
        if (!userList[userID]) {
            userList[userID] = nickname;
        };
        // If the action is change nickname or user enter chat with new nickname
        if (action === 'Change' || (action === 'Enter' && userList[userID] !== nickname)) {
            userList[userID] = nickname;
        } 
    });

    var answer = [];

    // Map record into "nickname - action" format based on nickname in UserList
    // The output is array ["Prodo came in.", ...]
    record.forEach(item => {
        let [action, userID] = item.split(' ');

        if (action === 'Enter') {
            answer.push(`${userList[userID]} came in.`);
        } else if (action === 'Leave') {
            answer.push(`${userList[userID]} has left.`);
        }
    })

    return answer;
}

console.log(solution(["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"]));