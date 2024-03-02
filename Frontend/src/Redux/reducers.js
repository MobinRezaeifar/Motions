const initialState = {
  Registers: [],
  ListNotes: [],
  IsSearching:false,
  backgroundColor: "",
  fontFamily: "",
  showSettingModel: false,
  ShowCompletedNoteModel: false,
  backgroundColorSidebar: "rgb(31 41 55)",
  backgroundColorHero: "rgb(31 41 55)",
  SearchingText:"",
  backgroundImg : ""
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_REGISTER_SUCCESS":
      return {
        ...state,
        Registers: [...state.Registers, action.payload],
      };

    case "FETCH_REGISTERS_SUCCESS":
      return {
        ...state,
        Registers: action.payload,
      };

    case "UPDATE_REGISTER_SUCCESS":
      return {
        ...state,
        Registers: state.Registers.map((register) =>
          register.id === action.payload.id ? action.payload : register
        ),
      };

    case "DELETE_REGISTER_SUCCESS":
      return {
        ...state,
        Registers: state.Registers.filter(
          (register) => register.id !== action.payload
        ),
      };

    case "ADD_LISTNOTE_SUCCESS":
      return {
        ...state,
        ListNotes: [...state.ListNotes, action.payload],
      };

    case "FETCH_LISTNOTE_SUCCESS":
      return {
        ...state,
        ListNotes: action.payload,
      };

    case "UPDATE_LISTNOTE_SUCCESS":
      return {
        ...state,
        ListNotes: state.ListNotes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };

    case "DELETE_LISTNOTE_SUCCESS":
      return {
        ...state,
        ListNotes: state.ListNotes.filter((note) => note.id !== action.payload),
      };

    case "CHANGE_BACKGROUND_COLOR":
      return { ...state, backgroundColor: action.payload };
    case "CHANGE_BACKGROUND_IMG":
      return { ...state, backgroundImg: action.payload };
    case "CHANGE_FONT_FAMILY":
      return { ...state, fontFamily: action.payload };
    case "SHOW_SETTING_MODEL":
      return { ...state, showSettingModel: action.payload };
    case "SHOW_COMPLETED_NOTE_MODEL":
      return { ...state, ShowCompletedNoteModel: action.payload };
    case "CHANGE_BACKGROUNDCOLOR_SIDEBAR":
      return { ...state, backgroundColorSidebar: action.payload };
    case "CHANGE_BACKGROUNDCOLOR_HERO":
      return { ...state, backgroundColorHero: action.payload };
    case "IS_SEARCHING":
      return { ...state, IsSearching: action.payload };
    case "SEARCHING_TEXT":
      return { ...state, SearchingText: action.payload };

    default:
      return state;
  }
};

export default reducer;
