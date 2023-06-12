exports.getDifficultyOptionsViewData= function(difficultyLevel){
    //   <option value="1">1 - Very Easy</option>
    const titles = ['Very Easy', 'Easy', 'Medium (Standard 3x3)', 'Intermediate', 'Expert', 'Hardcore'];
    const options = titles.map((title, index)=>({
        title:`${index+1} - ${title}`,
        value: index+1,
        selected: difficultyLevel==index+1 ? 'selected' : ''
    }))
    return options;
}