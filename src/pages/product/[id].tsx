import React, { Component } from 'react';
import styles from './[id].less';
import { query } from '@/services/product';
import { IRoute } from 'umi';
import { ProductType } from '@/@types/product';
import Carousel from './Carousel';
import Tags from '@/components/Tags';
import { Card, WhiteSpace } from 'antd-mobile';
import classnames from 'classnames';
import CartAndBuy from './CartAndBuy';

class Product extends Component<IRoute, {}> {
  state: ProductType = {
    imgs: [],
    price: 0,
    title: '',
    tags: [],
  };

  componentDidMount() {
    console.log(this.props);
    const { id } = this.props.match.params;
    // 获取商品详情
    query({ id }).then(res => {
      this.setState({ ...res.data });
    });
  }

  render() {
    const { imgs, price, title, tags } = this.state;
    return (
      <div className={styles.main}>
        <Carousel data={imgs} />
        <WhiteSpace size="lg" />
        <Card full>
          <p className={classnames('red', 'bold')}>￥{price}</p>
          <p className="font14">{title}</p>
          <WhiteSpace size="lg" />
          <Tags tags={tags} />
        </Card>

        <CartAndBuy {...this.state} />
      </div>
    );
  }
}

export default Product;
