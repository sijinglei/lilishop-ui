<template>
  <div class="search">
    <Card>
      <Row class="operation">
        <Button @click="add()" type="primary">设置今日热词</Button>
      </Row>
      <Row>
        <p>
          <Alert type="success">
            这里展示今日系统中搜索前一百的搜索热词，分数为热词在排序系统中的分数，分数越高，可以在用户获取热词时进行优先展示（首页商品搜索栏下方推荐位）（分数可以填写负数，会降低推荐度）
          </Alert>
        </p>
      </Row>

      <div class="card-list">
        <Card v-for="words in data" class="card-item" :key="words" onclick="">
          <p><a href="#" slot="extra" @click.prevent="add(words)">{{ words }}</a></p>
        </Card>
      </div>

    </Card>
    <Modal :title="modalTitle" v-model="modalVisible" :mask-closable="false" :width="500">
      <Form ref="form" :model="form" :label-width="100" >
        <FormItem label="热词" prop="name">
          <Input v-model="form.keywords" clearable style="width: 100%" />
        </FormItem>
        <FormItem label="分数" prop="name">
          <Input v-model="form.point" clearable style="width: 100%" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="modalVisible = false">取消</Button>
        <Button type="primary" :loading="submitLoading" @click="handleSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getHotWords, setHotWords } from "@/api/index";

export default {
  name: "hotWords",
  components: {},
  data() {
    return {
      submitLoading:false,
      modalTitle: "",
      loading: true, // 表单加载状态
      modalVisible: false, //弹出框
      form: {
        keywords: "",
        point: 0,
      },
      data: [], // 表单数据
    };
  },
  methods: {
    init() {
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      getHotWords().then((res) => {
        this.loading = false;
        if (res.success) {
          this.data = res.result;
        }
      });
      this.loading = false;
    },
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          setHotWords(this.form).then((res) => {
            this.submitLoading = false;
            if (res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
              this.modalVisible = false;
            }
          });
        }
      });
    },
    //设置热词优先
    add(words) {
      this.modalType = 0;
      this.modalTitle = "设置热词";
      if (words) {
        this.form.keywords = words;
      } else {
        this.form.keywords = "";
      }
      this.form.point = 1;
      this.$refs.form.resetFields();
      this.modalVisible = true;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.card-item {
  min-width: 100px;
  margin: 20px;
}
</style>
