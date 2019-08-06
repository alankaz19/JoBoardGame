import Vue from 'vue';
import VeeValidate from 'vee-validate';
import zh_TW from 'vee-validate/dist/locale/zh_TW'
import VueI18n from 'vue-i18n';
import { Validator } from 'vee-validate';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh_TW',
})
Vue.use(VeeValidate, {
  i18n,
  i18nRootKey: 'validation',
  dictionary: {
    zh_TW
  }
});

const dictionary = {
  zh_TW: {
    attributes: {
      email: 'Email 地址',
      password:'密碼',
      name:'名字'
    }
  },
  en: {
    attributes: {
      email: 'Email Address'
    }
  },
  custom: {
    email: {
      required: () => 'Email 不能留空'
    },
    name: {
      required: () => '名字 不能留空'
    },
    password: {
      required: () => '密碼 不能留空'
    },
  }
};


Validator.localize(dictionary);