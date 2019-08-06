import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const localStoragePlugin = store => {
  store.subscribe((mutation, { userInfo }) => {
    // 當執行 updateUserInfo 時才執行以下程式碼
    if (mutation.type === "updateUserInfo") {
      window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  });
};

export default new Vuex.Store({
  plugins: [localStoragePlugin],
  state: {
    isloading: false,
    isLogin: false,
    isVerify: false,
    memberId:null,
    domain: "http://localhost:8080", //保存後端請求的地址，修改时方便（比方说從測試服改成正式服域名）
    userInfo: {
      //保存用户資料
      name: null,
      avatarPath: null,
      verify: null,
      memberId:null,
    },
    //側拉欄
    //articles為了維持側拉欄運作留著
    articles: "",
    drawer: false,
    items: [
      {
        text: "首頁",
        to: "/",
        isActive: true
      },
      {
        text: "找團",
        to: "/main",
        isActive: true
      },
      {
        text: "開團",
        to: "/createGroup",
        isActive: null
      },
      {
        text: "我的揪團",
        to: "/group",
        isActive: null
      },
      {
        text: "個人檔案",
        to: "/user",
        isActive: null
      }
    ]
  },
  getters: {
    categories: state => {
      const categories = [];

      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        )
          continue;

        const text = article.category;

        categories.push({
          text,
          to: `/category/${text}`
        });
      }

      return categories.sort().slice(0, 4);
    },
    links: (state, getters) => {
      return state.items.concat(getters.categories);
    },
    isLogin: state => {
      return state.isLogin;
    },
    isVerify: state => {
      return state.isVerify;
    },
    userInfo: state => {
      return state.userInfo;
    },
    memberId: state => {
      return state.memberId;
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    updateDrawer(state, isLogin) {
      state.items.forEach(element => {
        element.isActive = isLogin;
      });
    },
    updateUserInfo(state, resData) {
      state.userInfo.avatarPath = resData.avatarPath;
      state.userInfo.name = resData.name;
      state.userInfo.verify = resData.verify;
      state.userInfo.memberId = resData.memberId;
    },
    updateAvatar(state, data) {
      state.userInfo.avatarPath = data;
    },
    updateLoginState(state, isLogin) {
      state.isLogin = isLogin;
    },
    updateVerifyState(state, isVerify) {
      state.isVerify = isVerify;
    },
    updateMemberId(state, memberId) {
      state.memberId = memberId;
    }
  },
  actions: {}
});
