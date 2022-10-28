import React, { useEffect, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Exercises from "../../hoc/Exercises/Exercises";
import Exercise from "../../components/Exercise/Exercise";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { NavLink, useParams } from "react-router-dom";
import { ListTitle } from "../../components/ListTitle/ListTitle";
import { v4 as uuid } from 'uuid';
import axios from 'axios';

export default function ToDo() {
  const baseURL = 'http://localhost:3001/';
  const {id} = useParams();
  const [createNewExerciseInputValue, setCreateNewExerciseInputValue] = useState("");
  const [createNewExerciseDateValue, setCreateNewExerciseDateValue] = useState("");
  const [createNewExerciseDescription, setCreateNewExerciseDescription] = useState("");
  const [createListInputValue, setCreateListInputValue] = useState("");
  const [editListTitle, setEditListTitle] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [updateValues, setUpdateValues] = useState(null);
  const [lists, setLists] = useState([
    {
      id: 0,
      listName: "General list"  
    },
    {
      id: 1,
      listName: "FFF list"  
    },
  ]);
  const [selectListId, setSelectListId] = useState(id || lists[0].id);
  const [exercises, setExercises] = useState([
    {id: "0", title: "123", date: Date.now(), description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", complete: false, isOpen: false},
    {id: "1", title: "123", date: Date.now(), description: "", complete: true, isOpen: false},
    {id: "2", title: "123", date: Date.now(), description: "", complete: false, isOpen: false}
  ]);

  const changeInputHandler = (event) => {
    setCreateNewExerciseInputValue(event.target.value);
  }

  const onCreateButtonClickHandler = async () => {
    if(createNewExerciseInputValue.trim() !== "") {
      const exercisesArr = [...exercises];
      if(updateValues === null) {
        // axios
        let exercise;
        await axios.post(baseURL + 'api/create-exercise', {
          title: createNewExerciseInputValue,
          date: createNewExerciseDateValue,
          description: createNewExerciseDescription
        })
        .then((response) => {
          exercise = {
            id: response.data.exercise._id,
            title: createNewExerciseInputValue,
            date: createNewExerciseDateValue,
            description: createNewExerciseDescription,
            complete: false,
            isOpen: false
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        exercisesArr.push(exercise);
      } else {
        exercisesArr[this.state.updateValues] = {
          title: createNewExerciseInputValue,
          date: createNewExerciseDateValue,
          description: createNewExerciseDescription,
          complete: exercises[updateValues].complete,
          isOpen: false
        }
      }
      setCreateNewExerciseInputValue("");
      setCreateNewExerciseDateValue("");
      setCreateNewExerciseDescription("");
      setUpdateValues(null);
      setExercises(exercisesArr);
    }
  }

  const onClose = () => {
    setMenuOpen(!menuOpen);
  }

  const clickOnLinkHandler = (event) => {
    const linkHref = event.target.href.split('/');
    console.log(lists);
    setSelectListId(linkHref[linkHref.length - 1]);
    setMenuOpen(false);
    document.title = this.state.lists.find(({id}) => id.toString() === linkHref[linkHref.length - 1].toString()).listName;
  }

  const onChangeDateInputHandler = (value) => {
    setCreateNewExerciseDateValue(value);
  }

  const onCheckboxesChecked = (event) => {
    const exercisesArr = [...exercises];
    exercisesArr[event.target.value].complete = !exercisesArr[event.target.value].complete;
    setExercises(exercisesArr);
    // axios post request
  }

  const onExerciseClickHandler = (event) => {
    const listnumber = +event.target.getAttribute("listnumber");
    const exercisesArr = [...exercises];
    exercisesArr[listnumber].isOpen = !exercisesArr[listnumber].isOpen;
    setExercises(exercisesArr);
  }

  const deleteButtonClickHandler = (event) => {
    const listnumber = +event.target.getAttribute("listnumber");    
    const exercisesArr = [exercises];
    exercisesArr.splice(listnumber, 1);
    setExercises(exercisesArr);
    // axios post request
  }

  const descriptionInputChangeHandler = (event) => {
    setCreateNewExerciseDescription(event.target.value);
  }

  const createListButtonClickHandler = () => {
    lists.push({
      id: uuid(),
      listName: createListInputValue
    })
    setCreateListInputValue("");
    console.log("lists: ", lists);
    // axios post request
  }

  const createListInputChangeHandler = (event) => {
    setCreateListInputValue(event.target.value);
  }

  const onExerciseDoubleClickHandler = (event) => {
    const listnumber = +event.target.getAttribute("listnumber");
    setCreateNewExerciseInputValue(exercises[listnumber].title);
    setCreateNewExerciseDateValue(exercises[listnumber].date);
    setCreateNewExerciseDescription(exercises[listnumber].description);
    setUpdateValues(listnumber);
  }

  const listTitleDoubleClickHandler = () => {
    setListTitle(lists.find(({id}) => id.toString() === selectListId.toString()).listName);
    setEditListTitle(true);
  }

  const listTitleInputChangeHandler = (event) => {
    setListTitle(event.target.value);
  }

  const listTitleApplyButtonClick = () => {
    let listsArr = [...lists];
    for(let i = 0; i < listsArr.length; i++) {
      if(selectListId.toString() === listsArr[i].id.toString() && listTitle.trim() !== listsArr[i].listName.trim()) {
        listsArr[i].listName = listTitle;
        setListTitle("")
        setEditListTitle(false);
        setLists(listsArr);
        console.log(lists);
      } else {
        setEditListTitle(false);
      }
    }
  }

  const listTitleDeleteButtonClick = () => {
    let listsArr = [...lists];
    for(let i = 0; i < listsArr.length; i++) {
      if(selectListId.toString() === listsArr[i].id.toString()) {
        listsArr.splice(i, 1);
        setListTitle("");
        setSelectListId(selectListId.toString() !== lists[0].id.toString() ? lists[0].id : lists[1].id);
        setEditListTitle(false);
        setLists(listsArr);
      }
    }
  }

  useEffect(() => {
    document.title = lists.find(({id}) => id.toString() === selectListId.toString()).listName;
  })

  return (
    <>
      <MenuToggle isOpen={menuOpen} onClick={onClose} />
      <Drawer 
        createListInputChange = {(event) => createListInputChangeHandler(event)} 
        createListInputValue = {createListInputValue} 
        createListButtonClick={createListButtonClickHandler} 
        isOpen={menuOpen} 
        onClose={onClose}
      >
        {lists.map((list, index) => (
          <li key={`links-${index}`}>
            <NavLink
              to={'/' + list.id}                
              className={({isActive}) => isActive ? "active" : null} 
              onClick={(event) => clickOnLinkHandler(event)}
            >
              {list.listName}
            </NavLink>
          </li>
        ))}
      </Drawer>
      <main>
        <Input
          value={createNewExerciseInputValue} 
          htmlFor="nameForExercise" 
          type="text"            
          onButtonClick={onCreateButtonClickHandler} 
          onChange={(event) => changeInputHandler(event)} 
          btnName={'Save'} 
          labelTitle = {'Name of exercise'}
          onChangeDateInput = {value => onChangeDateInputHandler(value)}
          dateValue = {createNewExerciseDateValue}
          htmlForDate = {"exerciseDate"}
          dateLabelTitle = {"Date to do"}
          descriptionLabel = {'Description'}
          onDescriptionInputChange = {(event) => descriptionInputChangeHandler(event)}
          descriptionValue = {createNewExerciseDescription}
        />
        <ListTitle 
          value={listTitle !== "" ? listTitle : lists.find(({id}) => (id.toString() === selectListId.toString())).listName}
          onDblClick = {listTitleDoubleClickHandler}
          onApplyButtonClick = {listTitleApplyButtonClick}
          onDeleteButtonClick = {listTitleDeleteButtonClick}
          canDelete = {lists.length > 1}
          inputChange = {(event) => listTitleInputChangeHandler(event)}
          editListTitle = {editListTitle}
          anotherList = {selectListId.toString() !== lists[0].id.toString() ? lists[0].id.toString() : (lists.length > 1 ? lists[1].id.toString() : null)}
        />
        <Exercises>          
          {exercises.map((exercise, index) => (
            <Exercise 
              key={index} 
              deleteButtonClick = {(event) => deleteButtonClickHandler(event)} 
              descriptionBlockOpen = {exercise.isOpen} 
              description={exercise.description} 
              listNumber={index} 
              onClick={onExerciseClickHandler} 
              onDblClick = {(event) => onExerciseDoubleClickHandler(event)}
              title={exercise.title} 
              onCheckboxesChecked={(event) => onCheckboxesChecked(event)} 
              date={exercise.date} 
              complete={exercise.complete}
            />
          ))}
        </Exercises>
      </main>
    </>
  )

}

// class ToDo extends Component {
//   constructor(props) {
//     super(props);
//     this.baseURL = 'http://localhost:3001/';
//     this.state = {
//       createNewExerciseInputValue: "",
//       createNewExerciseDateValue: "",
//       createNewExerciseDescription: "",
//       createListInputValue: "",
//       editListTitle: false,
//       listTitle: "",
//       menuOpen: false,
//       updateValues: null,
//       selectListId: this.props.paramsId,
//       lists: [
//         {
//           id: 0,
//           listName: "General list"  
//         },
//         {
//           id: 1,
//           listName: "FFF list"  
//         },
//       ],
//       exercises: [
//         {id: "0", title: "123", date: Date.now(), description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", complete: false, isOpen: false},
//         {id: "1", title: "123", date: Date.now(), description: "", complete: true, isOpen: false},
//         {id: "2", title: "123", date: Date.now(), description: "", complete: false, isOpen: false},
//       ]
//     }
//   }

//   changeInputHandler = (event) => {
//     this.setState({
//       createNewExerciseInputValue: event.target.value
//     })
//   }

//   onCreateButtonClickHandler = async () => {
//     if(this.state.createNewExerciseInputValue.trim() !== "") {
//       const exercises = [...this.state.exercises];
//       if(this.state.updateValues === null) {
//         // axios
//         let exercise;
//         await axios.post(this.baseURL + 'api/create-exercise', {
//           title: this.state.createNewExerciseInputValue,
//           date: this.state.createNewExerciseDateValue,
//           description: this.state.createNewExerciseDescription
//         })
//         .then((response) => {
//           exercise = {
//             id: response.data.exercise._id,
//             title: this.state.createNewExerciseInputValue,
//             date: this.state.createNewExerciseDateValue,
//             description: this.state.createNewExerciseDescription,
//             complete: false,
//             isOpen: false
//           }
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error);
//         })
//         exercises.push(exercise);
//         console.log(exercise);
//       } else {
//         exercises[this.state.updateValues] = {
//           title: this.state.createNewExerciseInputValue,
//           date: this.state.createNewExerciseDateValue,
//           description: this.state.createNewExerciseDescription,
//           complete: exercises[this.state.updateValues].complete,
//           isOpen: false
//         }
//       }
//       this.setState({
//         createNewExerciseInputValue: "",
//         createNewExerciseDateValue: "",
//         createNewExerciseDescription: "",
//         updateValues: null,
//         exercises
//       })
//     }
//   } 

//   onClose = () => {
//     this.setState({
//       menuOpen: !this.state.menuOpen
//     })
//   }

//   clickOnLinkHandler = (event) => {
//     const linkHref = event.target.href.split('/');
//     this.setState({
//       selectListId: linkHref[linkHref.length - 1],
//       menuOpen: false
//     })
//     document.title = this.state.lists.find(({id}) => id.toString() === linkHref[linkHref.length - 1].toString()).listName;
//   }

//   onChangeDateInputHandler = (value) => {
//     this.setState({
//       createNewExerciseDateValue: value
//     })
//   }

//   onCheckboxesChecked = (event) => {
//     const exercises = [...this.state.exercises];
//     exercises[event.target.value].complete = !exercises[event.target.value].complete;
//     this.setState({
//       exercises
//     })
//     // axios post request
//   }

//   onExerciseClickHandler = (event) => {
//     const listnumber = +event.target.getAttribute("listnumber");
//     const exercises = [...this.state.exercises];
//     exercises[listnumber].isOpen = !exercises[listnumber].isOpen;
//     this.setState({
//       exercises
//     })
//   }

//   deleteButtonClickHandler = (event) => {
//     const listnumber = +event.target.getAttribute("listnumber");    
//     const exercises = [...this.state.exercises];
//     exercises.splice(listnumber, 1);
//     this.setState({
//       exercises
//     })
//     // axios post request
//   }

//   descriptionInputChangeHandler = (event) => {
//     this.setState({
//       createNewExerciseDescription: event.target.value
//     });
//   }

//   createListButtonClickHandler = () => {
//     let lists = this.state.lists;
//     lists.push({
//       id: uuid(),
//       listName: this.state.createListInputValue
//     })
//     this.setState({
//       createListInputValue: "",
//       lists
//     })
//     // axios post request
//   }

//   createListInputChangeHandler = (event) => {
//     this.setState({
//       createListInputValue: event.target.value
//     })
//   }

//   onExerciseDoubleClickHandler = (event) => {
//     const listnumber = +event.target.getAttribute("listnumber");
//     this.setState({
//       createNewExerciseInputValue: this.state.exercises[listnumber].title,
//       createNewExerciseDateValue: this.state.exercises[listnumber].date,
//       createNewExerciseDescription: this.state.exercises[listnumber].description,
//       updateValues: listnumber
//     })
//   }

//   listTitleDoubleClickHandler = () => {
//     this.setState({
//       listTitle: this.state.lists.find(({id}) => id.toString() === this.state.selectListId.toString()).listName,
//       editListTitle: true
//     })
//   }

//   listTitleInputChangeHandler = (event) => {
//     this.setState({
//       listTitle: event.target.value
//     })
//   }

//   listTitleApplyButtonClick = () => {
//     let lists = [...this.state.lists];
//     for(let i = 0; i < lists.length; i++) {
//       if(this.state.selectListId.toString() === lists[i].id.toString() && this.state.listTitle.trim() !== lists[i].listName.trim()) {
//         lists[i].listName = this.state.listTitle;
//         this.setState({
//           listTitle: "",
//           editListTitle: false,
//           lists
//         })
//       } else {
//         this.setState({
//           editListTitle: false,
//         })
//       }
//     }
//   }

//   listTitleDeleteButtonClick = () => {
//     let lists = [...this.state.lists];
//     for(let i = 0; i < lists.length; i++) {
//       if(this.state.selectListId.toString() === lists[i].id.toString()) {
//         lists.splice(i, 1);
//         this.setState({
//           listTitle: "",
//           selectListId: this.state.selectListId.toString() !== this.state.lists[0].id.toString() ? this.state.lists[0].id : this.state.lists[1].id,
//           editListTitle: false,
//           lists
//         })
//       }
//     }
//   }

//   componentDidMount() {
//     document.title = this.state.lists.find(({id}) => id.toString() === this.state.selectListId.toString()).listName;
//   }

//   render() {    
//     return (
//       <>
//         <MenuToggle isOpen={this.state.menuOpen} onClick={this.onClose} />
//         <Drawer 
//           createListInputChange = {(event) => this.createListInputChangeHandler(event)} 
//           createListInputValue = {this.state.createListInputValue} 
//           createListButtonClick={this.createListButtonClickHandler} 
//           isOpen={this.state.menuOpen} 
//           onClose={this.onClose}
//         >
//           {this.state.lists.map((list, index) => (
//             <li key={`links-${index}`}>
//               <NavLink
//                 to={'/' + list.id}                
//                 className={({isActive}) => isActive ? "active" : null} 
//                 onClick={(event) => this.clickOnLinkHandler(event)}
//               >
//                 {list.listName}
//               </NavLink>
//             </li>
//           ))}
//         </Drawer>
//         <main>
//           <Input
//             value={this.state.createNewExerciseInputValue} 
//             htmlFor="nameForExercise" 
//             type="text"            
//             onButtonClick={this.onCreateButtonClickHandler} 
//             onChange={(event) => this.changeInputHandler(event)} 
//             btnName={'Save'} 
//             labelTitle = {'Name of exercise'}
//             onChangeDateInput = {value => this.onChangeDateInputHandler(value)}
//             dateValue = {this.state.createNewExerciseDateValue}
//             htmlForDate = {"exerciseDate"}
//             dateLabelTitle = {"Date to do"}
//             descriptionLabel = {'Description'}
//             onDescriptionInputChange = {(event) => this.descriptionInputChangeHandler(event)}
//             descriptionValue = {this.state.createNewExerciseDescription}
//           />          
//           <ListTitle 
//             value={this.state.listTitle !== "" ? this.state.listTitle : this.state.lists.find(({id}) => (id.toString() === this.state.selectListId.toString())).listName}
//             onDblClick = {this.listTitleDoubleClickHandler}
//             onApplyButtonClick = {this.listTitleApplyButtonClick}
//             onDeleteButtonClick = {this.listTitleDeleteButtonClick}
//             canDelete = {this.state.lists.length > 1}
//             inputChange = {(event) => this.listTitleInputChangeHandler(event)}
//             editListTitle = {this.state.editListTitle}
//             anotherList = {this.state.selectListId.toString() !== this.state.lists[0].id.toString() ? this.state.lists[0].id.toString() : (this.state.lists.length > 1 ? this.state.lists[1].id.toString() : null)}
//           />
//           <Exercises>          
//             {this.state.exercises.map((exercise, index) => (
//               <Exercise 
//                 key={index} 
//                 deleteButtonClick = {(event) => this.deleteButtonClickHandler(event)} 
//                 descriptionBlockOpen = {exercise.isOpen} 
//                 description={exercise.description} 
//                 listNumber={index} 
//                 onClick={this.onExerciseClickHandler} 
//                 onDblClick = {(event) => this.onExerciseDoubleClickHandler(event)}
//                 title={exercise.title} 
//                 onCheckboxesChecked={(event) => this.onCheckboxesChecked(event)} 
//                 date={exercise.date} 
//                 complete={exercise.complete}
//               />
//             ))}
//           </Exercises>
//         </main>
//       </>
//     )
//   }
// }

// export default ToDo;