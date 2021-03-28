export const handleMoveUpQuestion = (elementToReposition, formData, setFormData) => {

// Define the current index of the element 
const currentIndex = formData.questions.indexOf(elementToReposition)
//Define target index 
const  targetIndex = formData.questions.indexOf(elementToReposition) -1

// Check if target index coherent vs array length
if(targetIndex>formData.questions.length-1 || targetIndex <0){
return null
}

//Remove the selected question from questions list 
    let formDataCopy = {...formData};
    formDataCopy.questions.splice(currentIndex,1)

//Include the selected question in question-lists at the  targeted index 
formDataCopy.questions.splice(targetIndex,0, elementToReposition)

setFormData(formDataCopy);

}


export default handleMoveUpQuestion


