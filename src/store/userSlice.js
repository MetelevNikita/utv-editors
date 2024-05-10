import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import app from "../firebaseApp";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";


//


const db = getFirestore(app);


export const getUsers = createAsyncThunk(
  'users/getUsers',

  async () => {
    const users = await getDocs(collection(db, 'users'));
    return users.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    )
  })




export const createUser = createAsyncThunk(
  'users/createUser',

  async (user) => {
    const docRef =  await addDoc(collection(db, 'users'), user)
    console.log(docRef, 'профиль создан')
    return docRef
  }
)


const initialState = {
  users: []
}




const userSlice = createSlice({
  name: 'users',
  initialState: initialState,

reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    })

  }

})


export default userSlice.reducer;