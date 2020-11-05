<template>
  <div>
    <img
      class="headerimg"
      src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png"
    />
    <cube-form :model="model" :schema="schema" :immediate-validate="true" @submit="submitHandler"></cube-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: "", //用户名
        password: "" //登录密码
      },
      schema: {
        fields: [
          //用户名输入框配置
          {
            type: "input", //输入框的类型
            modelKey: "username", //类似v-model存储输入数据
            label: "用户名", //输入框前面的文本
            props: {
              placeholder: "请输入用户名"
            },
            //校验规则
            rules: {
              required: true, //输入不能成为空白
              type: "string", //输入文字类型
              min: 3, //最小输入
              max: 15 //最大输入
            },
            trigger: "blur", //输入框失去焦点，立刻校验
            messages: {
              //校验提示信息
              required: "用户名不能为空",
              min: "用户名不能小于3个字符",
              max: "用户名不能大于15个字符"
            }
          },
          //密码输入框配置
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password", //设置输入框的类型，然后密码就隐藏起来
              eye: {
                //密码输入框有一个小眼睛，点击显示密码
                open: false //设置默认密码是隐藏起来的
              }
            },
            rules: {
              required: true
            },
            trigger: "blur"
          },

          //按钮配置
          {
            type: "submit",
            label: "注册"
          }
        ]
      }
    };
  },
  methods: {
    submitHandler(event) {
      event.preventDefault();
      this.$http
        .get("/api/Register", { params: this.model })
        .then(res => {
          console.log(res.success);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped lang="stylus">
  .headerimg
    height 150px
    width 100%
</style>

