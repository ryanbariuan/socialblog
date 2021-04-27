let user;
let userID;
let accountDetails;
let userPostCount;
let myPosts;

if(localStorage.getItem('user'))
{
  user = JSON.parse(localStorage.getItem('user'));
  userID = JSON.parse(localStorage.getItem('userID'));
  accountDetails = JSON.parse(localStorage.getItem('accountDetails'));
  userPostCount = JSON.parse(localStorage.getItem('userPostCount'));
  myPosts = JSON.parse(localStorage.getItem('myPosts'));
}
else
{
  user = null;
  userID = null;
  accountDetails = null;
  userPostCount = 0;
  myPosts = [];
}

const initialState = {
  userState: user,
  userIDState: userID,
  acc: accountDetails,
  userPostCount: userPostCount,
  myPosts: myPosts
 
}

const reducer = (state = initialState, action) => {
  if(action.type === 'LOGIN')
  {
    localStorage.setItem('user', JSON.stringify(action.payload));
    return{
      userState: action.payload
    };
  }
  if(action.type === 'LOGOUT')
  {
    localStorage.removeItem('user');
    localStorage.removeItem('userID');
    localStorage.removeItem('accountDetails');
    localStorage.removeItem('userPostCount');
    localStorage.removeItem('myPosts');
    
    return{
      userState: null,
      userIDState: null,
      acc: null,
      userPostCount: 0,
      myPosts: [],
     
    };
  }
  if(action.type === 'LOAD_INFO')
  {
    localStorage.setItem('userID', JSON.stringify(action.payload._id));
    localStorage.setItem('accountDetails', JSON.stringify(action.payload));
    localStorage.setItem('userPostCount', JSON.stringify(action.payload.posts.length));

    return {
      ...state,
      userIDState: action.payload._id,
      userPostCount: action.payload.posts.length,
      acc: action.payload
    }
  }
  if(action.type === 'MY_POSTS')
  {
    localStorage.setItem('myPosts', JSON.stringify(action.payload));
    return {
      ...state,
      myPosts: action.payload
    }
  }

  else
  {
    return state;
  }

};

export default reducer;
