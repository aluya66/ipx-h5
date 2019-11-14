<template>
	<layout-view>
		<c-header
		slot="header"
		:left-arrow="true"
		>
			<div slot="title">智能组货</div>
			<template slot="right" tag="div">
				<img class="header-img" :src="headerSearchImg">
			</template>
		</c-header>
		<c-tabs
			:tabs="tabs"
			:line-width="'0.08rem'"
			:line-height="'0.05rem'"
			:title-active-color="'#3C5CF6'"
			:title-inactive-color="'#2A2B33'"
			:border="true"
			@change="onChangeTab"
		></c-tabs>
		<!-- 客户特征开始 -->
		<div class="container" v-show="currentTab === 1">
			<div class="item-wrapper">
				<div class="title">客户群体</div>
				<div class="item-box image-box customer-box">
					<div class="image-item customer-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
						<p class="image-infoo">123</p>
					</div>
					<div class="image-item customer-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
						<p class="image-info">123</p>
					</div>
					<div class="image-item customer-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
						<p class="image-info">123</p>
					</div>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="title">购买频次</div>
				<div class="item-box">
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
				</div>
			</div>

			<div class="item-wrapper">
				<div class="title">购买力</div>
				<div class="item-box">
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
				</div>
			</div>

			<div class="item-wrapper">
				<div class="title">消费偏好</div>
				<div class="item-box">
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
				</div>
			</div>
		</div>
		<!-- 客户特征结束 -->

		<!-- 商品特征开始 -->
		<div class="container" v-show="currentTab === 0">
			<div class="item-wrapper">
				<div class="title">品类</div>
				<div class="item-box image-box category-box">
					<div class="image-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
					</div>
					<div class="image-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
					</div>
					<div class="image-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
					</div>
					<div class="image-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
					</div>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="title">季节</div>
				<div class="item-box">
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="title">风格</div>
				<div class="item-box">
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="title">版型</div>
				<div class="item-box image-box format-box">
					<div class="image-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
					</div>
					<div class="image-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
					</div>
					<div class="image-item">
						<img class="image-img" src="">
						<p class="image-name">123</p>
					</div>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="title">材质</div>
				<div class="item-box">
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="title">色系</div>
				<div class="item-box">
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
				</div>
			</div>
			<div class="item-wrapper">
				<div class="title">厚度</div>
				<div class="item-box">
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
					<div class="item">123</div>
				</div>
			</div>	
		</div>
		<!-- 商品特征结束 -->
		<div class="bottom-btn">一键开启 智能组货</div>
	</layout-view>
</template>
<script>
import components from 'components'
import { Toast } from 'vant'
const { CTabs } = components
export default {
	components: {
		CTabs	
	},
	data() {
		return {
			currentTab: 0,
			tabs: [{
				name: 0,
				title: '商品特征'
			}, {
				name: 1,
				title: '客户特征'
			}],
			headerSearchImg: require('@/themes/images/groupGoods/header_search.png')
		}
	},
	methods: {
		onChangeTab(val) {
			console.log(val)
			this.currentTab = val;
		}
	}
}
</script>
<style lang="less">
	.header-img {
		display: inline-block;
		vertical-align: middle;
		width: 26px;
		height: 26px;
	}
	.container {
		padding: 0 16px;
		height: calc(100vh - 60px);
		overflow: auto;
		padding-bottom: 60px;
		background-color: #fff;
		.item-wrapper {
			position: relative;
			margin-bottom: 32px;
			.title {
				padding: 20px 0 13px;
				color: #585B66;
				font-size:14px;
				font-family:PingFangSC-Medium,PingFang SC;
				font-weight: 500;
				color: rgba(88,91,102,1);
				line-height: 20px;
			}
			.item-box {
				display: flex;
				flex-wrap: wrap;
				justify-content: flex-start;
				.item {
					margin-bottom: 12px;
					margin-right: 11px;
					width: 77px;
					height: 28px;
					font-size:12px;
					font-family: PingFangSC-Medium,PingFang SC;
					font-weight: 700;
					text-align: center;
					color:r gba(26,26,26,1);
					line-height: 28px;
					background:rgba(249,250,252,1);
					border-radius:14px;
				}
			}
			.image-box {
				display: flex;
				justify-content: space-between;
				.image-item {
					.image-img {
						margin-bottom: 8px;
						background:rgba(231,235,255,1);
						border-radius: 50%;
					}
					.image-name {
						margin: 0;
						font-family: PingFangSC-Regular,PingFang SC;
						text-align: center;
						font-weight: 700;
						color:rgba(42,43,51,1);
						line-height: 22px;
					}
					.image-info {
						margin: 0;
						font-size: 11px;
						font-family:P ingFangSC-Regular,PingFang SC;
						font-weight: 400;
						color: rgba(178,181,193,1);
						line-height: 16px;
					}
				}
			}
			.customer-box {
				padding: 16px 25px;
				width: 343px;
				height: 142px;
				text-align: center;
				background: rgba(255,255,255,1);
				box-shadow: 0px 2px 10px 0px rgba(33,44,98,0.08);
				border-radius: 8px;
				.image-img {
					width:64px;
					height:64px;
				}	
				.image-name {
					font-size: 16px;
				}
			}
			.category-box {
				.image-item {
					flex-grow: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					.image-img {
						display: block;
						margin-bottom: 11px;
						width: 10px;
						height: 10px;
						background-color: red;
					}
				}
			}
			.format-box {
				.image-img {
					width:107px;
					height:66px;
				}	
			}
		}
	}
	.bottom-btn {
		position: fixed;
		bottom: 27px;
		left: 50%;
		transform: translateX(-50%);
		width: 343px;
		height: 45px;
		font-size:18px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight: 700;
		color: rgba(255,255,255,1);
		text-align: center;
		line-height: 45px;
		background:rgba(60,92,246,1);
		border-radius:25px;
		
	}
</style>
