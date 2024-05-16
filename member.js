function skillsMember(member){
    // Check if member object has property 'skills'
    if (member.hasOwnProperty('skills')) {
        return member.skills;
    } else {
        return 'This member does not have any skills listed.';
    }
}