<template>
  <div class="detail">
    <nav-bar class="nav-bar" right-width="70px" bg-color="rgba(0,0,0,0)" is-back>
      <template #left>
        <van-icon name="arrow-left" size="12" class="icon" color="#ffffff" />
      </template>
      <template #right>
        <span class="right">
          <van-icon name="share-o" size="12" class="icon" color="#ffffff" />
          <van-icon name="ellipsis" size="12" class="icon" color="#ffffff" />
        </span>
      </template>
    </nav-bar>
    <template v-if="goodsDetail">
      <van-swipe :autoplay="3000" height="400" @change="handleSwipeChange">
        <van-swipe-item v-for="image in goodsDetail.itemInfo.topImages" :key="image">
          <img v-lazy="image" width="100%" height="100%" />
        </van-swipe-item>

        <template #indicator>
          <div class="indicator">
            {{ currentIndex + 1 }}/{{ goodsDetail.itemInfo.topImages.length }}
          </div>
        </template>
      </van-swipe>

      <div class="info">
        <div class="info-top">
          <div class="price">{{ goodsDetail.itemInfo.highNowPrice }}</div>
          <div class="cfav">
            <van-icon name="star-o" />
            <div>收藏</div>
          </div>
        </div>
        <div class="title">
          {{ goodsDetail.itemInfo.title }}
        </div>
        <div class="tags">
          <van-tag color="#00bfc020" text-color="#00bfc0">免税</van-tag>
          <van-tag color="#00bfc020" text-color="#00bfc0" style="margin-left: 10px">包邮</van-tag>
        </div>
      </div>

      <van-cell-group class="service">
        <van-cell
          is-link
          title-class="van-title"
          value-class="van-value"
          title="选择"
          value="颜色、款式"
        />
        <van-cell
          is-link
          title-class="van-title"
          value-class="van-value"
          title="配送"
          value="广东省 深圳市 南山区"
        />
        <van-cell
          is-link
          title-class="van-title"
          value-class="van-value"
          title="运费"
          value="此商品包邮"
        />
        <van-cell
          is-link
          title-class="van-title"
          value-class="van-value"
          title="说明"
          value="7天无理由退货·正品保障·顺丰包邮"
        />
      </van-cell-group>

      <div class="shop-info">
        <img :src="goodsDetail.shopInfo.shopLogo" />
        <div class="shop-name">{{ goodsDetail.shopInfo.name }}</div>
      </div>

      <div class="detail-info">
        <template v-for="item in goodsDetail.detailInfo.detailImage">
          <div :key="item.key">
            <div style="text-align: center; margin: 10px 0" v-if="item.list">
              <van-tag color="#333" plain>{{ item.key }}</van-tag>
            </div>
            <template v-for="image in item.list">
              <img :src="image" :key="image" width="100%" />
            </template>
          </div>
        </template>
      </div>
    </template>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/cart" />
      <van-goods-action-button
        color="#0a0c19"
        type="warning"
        text="加入购物车"
        @click="show = true"
      />
      <van-goods-action-button color="#00bfc0" type="danger" text="立即购买" @click="show = true" />
    </van-goods-action>

    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="gid"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    >
      <template #sku-actions="props">
        <div class="van-sku-actions">
          <van-button
            square
            size="large"
            type="warning"
            color="#0a0c19"
            @click="props.skuEventBus.$emit('sku:addCart')"
          >
            加入购物车
          </van-button>
          <van-button
            square
            size="large"
            type="danger"
            color="#00bfc0"
            @click="props.skuEventBus.$emit('sku:buy')"
          >
            立即购买
          </van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { queryGoodsDetail, addCart } from '@/api';
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data: () => ({
    goodsDetail: null,
    currentIndex: 0,
    // 商品id
    gid: 0,
    show: false, // 是否展示sku
    // sku 数据
    sku: {
      tree: [],
      stock_num: 227, // 商品总库存
      price: '1.00', // 默认价格（单位元）
    },
    // 商品数据
    goods: {
      // 默认商品 sku 缩略图
      picture: 'https://img01.yzcdn.cn/1.jpg',
    },
  }),
  mounted() {
    const { iid, id } = this.$route.query;
    this.gid = id;
    this.queryGoodsDetail(iid);
  },
  methods: {
    /** 查询商品详情 */
    async queryGoodsDetail(iid) {
      const goodsDetail = await queryGoodsDetail(iid);
      goodsDetail.detailInfo = JSON.parse(goodsDetail.detailInfo);
      goodsDetail.itemInfo = JSON.parse(goodsDetail.itemInfo);
      goodsDetail.itemParams = JSON.parse(goodsDetail.itemParams);
      goodsDetail.shopInfo = JSON.parse(goodsDetail.shopInfo);
      this.goodsDetail = goodsDetail;
      // sku
      this.sku.price = goodsDetail.itemInfo.highNowPrice;
      // 商品缩略图
      this.goods.picture = goodsDetail.itemInfo.topImages[0];
    },
    /** 轮播图切换 */
    handleSwipeChange(index) {
      this.currentIndex = index;
    },
    /** 加入购物车 */
    async onAddCartClicked({ goodsId, selectedNum }) {
      await addCart({ num: selectedNum, gid: goodsId });
      this.show = false;
    },
    /** 立即购买 */
    onBuyClicked() {
      console.log('立即购买');
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  background: @theme-light-gray;
}
.nav-bar {
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  .icon {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    padding: 8px;
  }
  .right {
    display: flex;
    justify-content: space-evenly;
  }
}

.indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 4px 10px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  border-radius: 3px;
}
.info {
  background: #ffffff;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  .info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .price {
      color: @theme-primary;
      font-weight: 600;
    }
    .cfav {
      text-align: center;
      font-size: 12px;
    }
  }
  .title {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 26px;
    line-height: 1.5;
    margin: 10px 0;
  }
}
.service {
  margin: 16px;
  background: #ffffff;
  border-radius: 8px;
}
.van-title {
  flex: 0;
  flex-basis: 120px;
}
.van-value {
  text-align: left;
}
.shop-info {
  display: flex;
  margin: 16px;
  padding: 16px;
  background: #ffffff;
  img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
  }
  .shop-name {
    margin-left: 30px;
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
