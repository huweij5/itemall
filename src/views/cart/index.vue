<template>
  <div class="cart">
    <van-sticky>
      <nav-bar class="nav-bar" bg-color="#00bfc0">
        <template #center> 购物车 </template>
        <template #right>
          <span @click="isEdit = !isEdit">编辑</span>
        </template>
      </nav-bar>
    </van-sticky>
    <div class="overflow"></div>

    <div v-if="carts.length > 0" class="content" :style="{ 'padding-bottom': getBottom }">
      <van-checkbox-group icon-size="16px" v-model="selectIds">
        <template v-for="(cart, index) in carts">
          <div :key="cart.id" class="item">
            <van-checkbox style="width: 35px" checked-color="#ff7600" :name="cart.id" />
            <div>
              <div class="shop-info">
                <div class="name">莱思购自营</div>
                <div class="service">免运费</div>
              </div>
              <div class="goods-info">
                <img :src="cart.goods.show.img" />
                <div class="info">
                  <div class="title">{{ cart.goods.title }}</div>
                  <div class="bottom">
                    <span class="price">￥{{ cart.goods.price }}</span>
                    <div>
                      <button @click="handleDecrement(index)">-</button>
                      <span class="count">{{ cart.num }}</span>
                      <button @click="handleIncrement(index)">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </van-checkbox-group>
    </div>

    <van-empty v-else description="购物车中没有商品，快去选购吧" />

    <van-submit-bar
      ref="submitBarRef"
      :price="total * 100"
      :style="{ bottom: tabBarHeight - 1 + 'px', '--visible': isEdit ? 'hidden' : 'visible' }"
    >
      <van-checkbox v-model="checked" checked-color="#ff7600" @click="handleToggleAll">
        全选
      </van-checkbox>
      <template #button>
        <van-button
          round
          size="small"
          plain
          type="danger"
          v-if="isEdit"
          @click="handleDel(selectIds)"
        >
          删除
        </van-button>
        <van-button round size="small" color="linear-gradient(to right,#fe9400,#ff5b05)" v-else>
          结算
        </van-button>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Dialog } from 'vant';
import { queryCart, queryGoodsById, delCart, editCart } from '@/api';
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data: () => ({
    // 购物车列表
    carts: [],
    // 选中的购物车id
    selectIds: [],
    // 提交栏高度
    submitBarHeight: 0,
    // 是否编辑
    isEdit: false,
    checked: false,
  }),
  computed: {
    ...mapState(['tabBarHeight']),
    // 距离底部距离
    getBottom() {
      return this.tabBarHeight + this.submitBarHeight + 'px';
    },
    // 总价
    total() {
      return this.carts
        .filter((el) => this.selectIds.includes(el.id))
        .reduce((prev, el) => prev + el.num * el.goods.price, 0);
    },
  },
  mounted() {
    this.queryCart();
    this.submitBarHeight = this.$refs.submitBarRef.offsetHeight;
  },
  methods: {
    /** 查询购物车 */
    async queryCart() {
      const carts = await queryCart();
      for (const cart of carts) {
        const goods = await queryGoodsById(cart.gid);
        goods.show = JSON.parse(goods.show);
        cart.goods = goods;
      }
      this.carts = carts;
    },
    /** 全选 */
    handleToggleAll() {
      // 清空选中的购物车id
      this.selectIds = [];
      // 如果全选，将所有购物车id添加到选中的购物车id中
      if (this.checked) {
        this.selectIds = this.carts.map((el) => el.id);
      }
    },
    /** 删除 */
    async handleDel(selectIds) {
      for (const id of selectIds) {
        // 删除购物车
        await delCart(id);
      }
      // 查询
      await this.queryCart();
      // 删除已经被删除的购物车id
      this.selectIds = this.selectIds.filter((id) => !selectIds.includes(id));
    },
    /** 减少 */
    async handleDecrement(index) {
      const cart = this.carts[index];
      const num = cart.num - 1;

      // 如果数量大于0，修改购物车数量，否则删除购物车
      if (num > 0) {
        await editCart(cart.id, { num });
        this.queryCart();
        return;
      }

      Dialog.confirm({
        title: '提示',
        message: '是否确认删除',
      })
        .then(() => {
          // 删除购物车
          this.handleDel([cart.id]);
        })
        .catch(() => {});
    },
    /** 增加 */
    async handleIncrement(index) {
      const cart = this.carts[index];
      await editCart(cart.id, { num: cart.num + 1 });
      this.queryCart();
    },
  },
  watch: {
    // 监听选中的购物车id，如果选中的购物车id长度等于购物车列表长度，全选
    selectIds() {
      console.log(this.selectIds.length, this.carts.length);
      this.checked = this.selectIds.length === this.carts.length;
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  background: @theme-light-gray;
  min-height: 100vh;
}
.nav-bar {
  color: #ffffff;
}

.overflow {
  height: 200px;
  background-color: #00bfc0;
}
.content {
  margin: -180px 16px 0 16px;
}

.item {
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  padding: 16px;
}

.item:not(:first-child) {
  margin-top: 24px;
}

.shop-info {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  .name {
    font-weight: 600;
    font-size: 16px;
  }
  .service {
    color: @theme-gray;
    font-size: 16px;
  }
}
.goods-info {
  padding: 16px;
  display: flex;
  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
  }
  .info {
    flex: 1;
    margin-left: 16px;
    .title {
      font-size: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.5;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 24px;
      .price {
        color: red;
        font-size: 28px;
      }
      button {
        border: 0;
        color: @theme-gray;
        margin: 0 8px;
      }
      .count {
        font-size: 16px;
      }
    }
  }
}

.van-submit-bar__text {
  visibility: var(--visible); //  visible 和 hidden 切换
}
</style>
