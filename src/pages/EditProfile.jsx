import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function EditProfile() {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
    let preview = document.getElementById("imagepreview");
    preview.src = URL.createObjectURL(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (file) {
      const obj = {
        id: 4,
      };
      let formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify(obj));
      //console.log(formData);
      const response = await axios.post(
        "http://10.126.15.135:8002/upload",
        formData
      );
      //console.log(response);
    } else {
      alert("Select image first");
    }
  };
  const userGlobal = useSelector((state) => state.user.user);
  return (
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            id="imagepreview"
            className="mx-auto h-16 w-16 rounded-full ring-2 ring-red"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Edit Profile {userGlobal.name}
          </h2>
        </div>
        <div className="-space-y-px rounded-md shadow-sm">
          {/* <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  class="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">
                    Click to upload your Profil Picture
                  </span>{" "}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="file"
                type="file"
                //class="hidden"
                onChange={(event) => onFileChange(event)}
              />
            </label>
          </div> */}
          <br />
          {/* <div>
            <button
              onClick={() => uploadImage()}
              type="button"
              className="group relative flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
              Upload
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
