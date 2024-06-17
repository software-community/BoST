"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DynamicField from "@/components/ui/dynamic-input-field";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useFormState } from "react-dom";
import { updateProject } from "@/app/actions/ProjectActions";


const developmentStatus = [
  { id: 1, name: "Not Started" },
  { id: 2, name: "In Progress" },
  { id: 3, name: "Completed" },
];

export default function Form({projectDetails}){
  const { register, handleSubmit, control } = useForm({defaultValues: {
    repoLinks: projectDetails.relatedLinks.map(item => { return {value: item.url} }), // Initialize with one empty field
    teamMembers: projectDetails.members.map(item => { return {value: item} }) // Initialize with one empty field
  }});

  
  const handleClear = () => {
    window.location.reload();
  };
    
  const initialState = {
    repoLinks: projectDetails.relatedLinks.map(item => item.url),
    // repoLinks: [''],
    teamMembers: projectDetails.members,
    // teamMembers: ['']
  };
  // console.log(projectDetails.relatedLinks.map(item => { value: item.url }))
  
  const updateProjectWithId = updateProject.bind(null, projectDetails._id);
  const [state, dispatch] = useFormState(updateProjectWithId  , initialState);
      
  const onSubmit = (data) => {
    console.log(data);
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.set('members', JSON.stringify(data.teamMembers));
    formData.set('relatedLinks', JSON.stringify(data.repoLinks));
    dispatch(formData);
  };


      // function reducer(state, action) {
        //   switch (action.type) {
  //     case "ADD_ENTRY":
  //       return {
  //         ...state,
  //         [action.payload.type]: Array.isArray(state[action.payload.type])
  //           ? [...state[action.payload.type], action.payload.value]
  //           : [action.payload.value],
  //       };
  //     case "REMOVE_ENTRY":
  //       return {
  //         ...state,
  //         [action.payload.type]: Array.isArray(state[action.payload.type])
  //           ? state[action.payload.type].filter(
  //               (_, index) => index !== action.payload.index
  //             )
  //           : [],
  //       };
  //     case "UPDATE_ENTRY":
  //       return {
  //         ...state,
  //         [action.payload.type]: Array.isArray(state[action.payload.type])
  //           ? state[action.payload.type].map((entry, index) =>
  //               index === action.payload.index ? action.payload.value : entry
  //             )
  //           : [action.payload.value],
  //       };
  //     default:
  //       return state;
  //   }
  // }

  // const [state, dispatch] = useReducer(reducer, initialState);

  // const handleAddEntry = (type) => {
  //   dispatch({
  //     type: "ADD_ENTRY",
  //     payload: {
  //       type: type,
  //       value: "",
  //     },
  //   });
  // };

  // const handleRemoveEntry = (type, index) => {
  //   dispatch({
  //     type: "REMOVE_ENTRY",
  //     payload: {
  //       type: type,
  //       index: index,
  //     },
  //   });
  // };

  // const handleUpdateEntry = (type, index, value) => {
  //   dispatch({
  //     type: "UPDATE_ENTRY",
  //     payload: {
  //       type: type,
  //       index: index,
  //       value: value,
  //     },
  //   });
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={projectDetails.title}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter title"
            aria-describedby="title-error"
          />
          {/* <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={projectDetails.description}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter description"
            rows="3"
            aria-describedby="description-error"
          ></textarea>
          {/* <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* Github and related links
        <DynamicField
          label="Github Repo and related Links"
          fields={state.repoLinks}
          onAdd={() => handleAddEntry("repoLinks")}
          onRemove={(index) => handleRemoveEntry("repoLinks", index)}
          onUpdate={(index, value) =>
            handleUpdateEntry("repoLinks", index, value)
          }
        />

        {/* Team members */}
        {/* <DynamicField
          label="Team Members"
          fields={state.teamMembers}
          onAdd={() => handleAddEntry("teamMembers")}
          onRemove={(index) => handleRemoveEntry("teamMembers", index)}
          onUpdate={(index, value) =>
            handleUpdateEntry("teamMembers", index, value)
          }
        /> */}

        <div className="mb-4">
          {/* {fields.map(({id}, index) => (
        <div key={id} className="mb-2 flex items-center">
          <input
            type="text"
          />
          {(fields.length < 1 || fields[0]!='') && ( // Conditionally render the "-" button if the array is not empty
            <Button type="button" onClick={() => remove(index)}>
              -
            </Button>
          )}
        </div>
      ))}
      <Button type="button" onClick={() => append({})}>
        +
      </Button>
    </div> */}

          {/* {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`tt[${index}].firstName`}
            control={control}
            defaultValue={item.firstName}
            render={({ field }) => <input {...field} placeholder="First Name" />}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500 mr-2"
          />
          <Button type="button" onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}

      <Button type="button" onClick={() => append({ firstName: '', lastName: '' })}>
        +
      </Button> */}

          {/* Github and related links */}
          <DynamicField
            control={control}
            name="repoLinks"
            label="Github Repo and related Links"
            placeholder="Enter link"
          />

          {/* Team members */}
          <DynamicField
            control={control}
            name="teamMembers"
            label="Team Members"
            placeholder="Enter team Member"
          />

          {/* Status */}
          <div className="mb-4">
            <label htmlFor="status" className="mb-2 block text-sm font-medium">
              Status
            </label>
            {/* <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Project Status" />
            </SelectTrigger>
            <SelectContent className="SelectContent">
              {developmentStatus.map((status) => (
                <SelectItem key={status.id} value={status.id.toString()}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select> */}

            <select
              id="status"
              name="status"
              defaultValue={projectDetails.status}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="status-error"
            >
              <option value="" disabled>
                Select a club
              </option>
              <option value="not_started">Not started</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
        <Button
          onClick={handleClear}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Clear
        </Button>
        <Button type="submit">Update Project</Button>
      </div>
      </div>
    </form>
  );
};

// export default Form;
