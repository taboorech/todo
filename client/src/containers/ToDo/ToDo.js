import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Exercises from "../../hoc/Exercises/Exercises";
import Exercise from "../../components/Exercise/Exercise";
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { ListTitle } from "../../components/ListTitle/ListTitle";
import axios from 'axios';
import Cookies from "js-cookie";

export default function ToDo() {

  const navigate = useNavigate();

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
  const [lists, setLists] = useState([]);
  const [selectListId, setSelectListId] = useState(id || "");
  const [exercises, setExercises] = useState([]);

  const changeInputHandler = (event) => {
    setCreateNewExerciseInputValue(event.target.value);
  }

  const onCreateButtonClickHandler = async () => {
    if(createNewExerciseInputValue.trim() !== "") {
      const exercisesArr = [...exercises];
      if(updateValues === null) {
        let exercise;
        await axios.post(baseURL + 'api/create-exercise', {
          title: createNewExerciseInputValue,
          date: createNewExerciseDateValue,
          description: createNewExerciseDescription,
          listId: selectListId
        }, {
          withCredentials: true
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
        })
        .catch((error) => {
          console.log(error);
        })
        exercisesArr.push(exercise);
      } else {
        if(exercises[updateValues].title.trim() !== createNewExerciseInputValue || 
          exercises[updateValues].date !== createNewExerciseDateValue || 
          exercises[updateValues].description.trim() !== createNewExerciseDescription
        ) {
          await axios.put(baseURL + 'api/exercise-update', {
            id: exercises[updateValues].id,
            title: createNewExerciseInputValue,
            date: createNewExerciseDateValue,
            description: createNewExerciseDescription,
            complete: exercises[updateValues].complete
          }, {
            withCredentials: true
          })
          .then((response) => {
            if(response.status === 204) {
              exercisesArr[updateValues] = {
                title: createNewExerciseInputValue,
                date: createNewExerciseDateValue,
                description: createNewExerciseDescription,
                complete: exercises[updateValues].complete,
                isOpen: false
              }
            }
          })
          .catch((error) => {
            console.log(error);
          })
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
    if(linkHref[linkHref.length - 1] !== selectListId) {
      setSelectListId(linkHref[linkHref.length - 1]);
      getExercisesRequest(linkHref[linkHref.length - 1]);
      document.title = lists.find(({id}) => id.toString() === linkHref[linkHref.length - 1].toString()).listName;
    }
    setMenuOpen(false);
  }

  const onChangeDateInputHandler = (value) => {
    setCreateNewExerciseDateValue(value);
  }

  const onCheckboxesChecked = async (event) => {
    const exercisesArr = [...exercises];
    exercisesArr[event.target.value].complete = !exercisesArr[event.target.value].complete;
    await axios.put(baseURL + 'api/exercise-complete', {
      id: exercisesArr[event.target.value].id,
      complete: exercisesArr[event.target.value].complete
    }, {
      withCredentials: true
    })
    .catch((error) => {
      console.log(error);
    })
    setExercises(exercisesArr);
  }

  const onExerciseClickHandler = (event) => {
    const listnumber = +event.target.getAttribute("listnumber");
    const exercisesArr = [...exercises];
    exercisesArr[listnumber].isOpen = !exercisesArr[listnumber].isOpen;
    setExercises(exercisesArr);
  }

  const deleteButtonClickHandler = async (event) => {
    const listnumber = +event.target.getAttribute("listnumber");
    const exercisesArr = [...exercises];
    await axios.delete(baseURL + 'api/exercise-delete', {
      data: {
        id: exercisesArr[listnumber].id,
        listId: selectListId
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
    exercisesArr.splice(listnumber, 1);
    setExercises(exercisesArr);
  }

  const descriptionInputChangeHandler = (event) => {
    setCreateNewExerciseDescription(event.target.value);
  }

  const createListButtonClickHandler = async () => {
    await axios.post(baseURL + 'api/create-list', {
      title: createListInputValue
    }, {
      withCredentials: true
    })
    .then((response) => {
      setLists(oldArray => [...oldArray, {
        id: response.data.list._id,
        listName: createListInputValue
      }]);
      setCreateListInputValue("");
    })
    .catch((error) => {
      console.log(error);
    })
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

  const listTitleApplyButtonClick = async () => {
    let listsArr = [...lists];
    for(let i = 0; i < listsArr.length; i++) {
      if(selectListId === listsArr[i].id && listTitle.trim() !== listsArr[i].listName.trim()) {
        await axios.put(baseURL + 'api/list-update', {
          id: selectListId,
          title: listTitle
        }, {
          withCredentials: true
        })
        .catch((error) => {
          console.log(error);
        })
        document.title = listTitle;
        listsArr[i].listName = listTitle;
        setListTitle("")
        setEditListTitle(false);
        setLists(listsArr);
      } else {
        setEditListTitle(false);
      }
    }
  }

  const listTitleDeleteButtonClick = async () => {
    let listsArr = [...lists];
    for(let i = 0; i < listsArr.length; i++) {
      if(selectListId.toString() === listsArr[i].id.toString()) {
        await axios.delete(baseURL + 'api/list-delete', {
          data: {
            listId: selectListId
          },
          withCredentials: true
        })
        .then((response) => {
          if(response.status === 204) {
            listsArr.splice(i, 1);
            setListTitle("");
            setSelectListId(selectListId.toString() !== lists[0].id.toString() ? lists[0].id : lists[1].id);
            setEditListTitle(false);
            setLists(listsArr);
            document.title = selectListId.toString() !== lists[0].id.toString() ? lists[0].listName : lists[1].listName;
            getExercisesRequest(selectListId.toString() !== lists[0].id.toString() ? lists[0].id : lists[1].id);
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }

  const fetchData = useCallback( async () => {
    await axios.get(baseURL + 'api/lists', {
      withCredentials: true
    })
    .then((response) => {
      setLists([...response.data.lists]);
      let selectList = '';
      selectList = response.data.lists.find((list) => list.id === id) || response.data.lists[0];
      setSelectListId(selectList.id);
      document.title = selectList.listName;
      getExercisesRequest(selectList.id);
    })
    .catch((error) => {
      console.log(error);
    })
  }, [id]);

  const getExercisesRequest = async (selectListId) => {
    await axios.post(baseURL + 'api/exercises', {
      listId: selectListId
    }, {
      withCredentials: true
    })
    .then((response) => {
      setExercises([...response.data.exercises])
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    if(!Cookies.get('sid')) {
      return navigate('/auth');
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
              className={({isActive}) => isActive || list.id === selectListId ? "active" : null} 
              onClick={event => clickOnLinkHandler(event)}
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
        {lists.length > 0 ?
        <ListTitle
          value={listTitle !== "" ? listTitle : lists.find(({id}) => (id === selectListId)).listName}
          onDblClick = {listTitleDoubleClickHandler}
          onApplyButtonClick = {listTitleApplyButtonClick}
          onDeleteButtonClick = {listTitleDeleteButtonClick}
          canDelete = {lists.length > 1}
          inputChange = {(event) => listTitleInputChangeHandler(event)}
          editListTitle = {editListTitle}
          anotherList = {lists.length > 0 && selectListId.toString() !== lists[0].id.toString() ? lists[0].id.toString() : (lists.length > 1 ? lists[1].id.toString() : null)}
        /> : null}
        {lists.length > 0 ?
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
        </Exercises> : null}
      </main>
    </>
  )

}