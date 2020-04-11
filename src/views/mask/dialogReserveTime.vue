<template>
    <div class="dialog-time-container" @touchstart="touchStart" @touchend="touchEnd">
        <div class="dialog-time-content" :class="{'dialog-time-content-hide': true}">
            <div class="dialog-time-title">
                <img src="../../themes/images/app/icon_close24_gray_def@3x.png" @click="close"/>
                <span class="title">选择预定时间</span>
            </div>
            <div class="dialog-time-area">
                <div class="dialog-time-cover"></div>
                <div class="dialog-time-select">
                    <ul class="time-column width-84"  id="time-year">
                        <li v-for="(item, index) in years" :key="index">{{item}}</li>
                    </ul>
                    <ul class="time-column width-108" id="time-month">
                        <li v-for="(item, index) in showMonths" :key="index">{{item}}</li>
                    </ul>
                    <ul class="time-column width-120" id="time-day">
                        <li v-for="(item, index) in showDates" :key="index">{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="dialog-time-confirm" @click="confirmDate">
                确定
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            years: [
                '',
                '',
                '2020年',
                '2021年',
                '2022年',
                '2023年',
                '2024年',
                '2025年',
                '',
                ''
            ],
            defaultMonths: [
                '',
                '',
                '1月',
                '2月',
                '3月',
                '4月',
                '5月',
                '6月',
                '7月',
                '8月',
                '9月',
                '10月',
                '11月',
                '12月',
                '',
                ''
            ],
            showDialog: true,
            currentDate: new Date(),
            isScrollFinish: true,
            targetElement: {},
            scrollTop: 0,
            yearIndex: 2,
            monthIndex: 2,
            dateIndex: 2,
            showMonths: [],
            showDates: []
        }
    },
    methods: {
        /**
         * 关闭对话框事件
         */
        close() {
            this.$emit('onDateClosed')
        },
        /**
         * 选择数量事件
         */
        confirmDate() {
            let year = this.years[this.yearIndex].replace('年', '')
            let month = this.showMonths[this.monthIndex].replace('月', '')
            let date = this.showDates[this.dateIndex].split('日')[0]
            let selectDate = year + '-' + month + '-' + date
            this.$emit('onConfirmDate', selectDate)
            console.log(selectDate)
            this.close()
        },
        touchStart() {
            this.isScrollFinish = false
        },
        touchEnd() {
            this.isScrollFinish = true
        },
        getMonthsByYear() {
            let year = this.years[this.yearIndex].substring(0, 4)
            if (year > this.currentDate.getFullYear()) {
                this.showMonths = this.defaultMonths
                this.getDatesByMonth()
                return
            }
            let months = ['', '']
            let currentMonth = this.currentDate.getMonth()
            this.defaultMonths.forEach((month, index) => {
                if (currentMonth + 2 <= index) {
                    months.push(month)
                }
            })
            this.showMonths = months
            // this.monthIndex = 2
            this.getDatesByMonth()
        },
        getDatesByMonth() {
            let currentYear = this.currentDate.getFullYear()
            let year = this.years[this.yearIndex].substring(0, 4)
            let month = parseInt(this.showMonths[this.monthIndex].replace('月', ''))
            let currentDate = this.currentDate.getDate()
            let start = currentYear < year || month > this.currentDate.getMonth() + 1 ? 1 : currentDate
            console.log('year = ' + year + ', start = ' + start + ', month = ' + month)
            this.showDates = ['', '']
            for (let i = start; i <= this.getDaysByMonth(month); i++) {
                this.showDates.push(i + '日 ' + this.getWeekday(year, month - 1, i))
            }
            this.showDates.push('')
            this.showDates.push('')
        },
        getDaysByMonth(month) {
            let year = this.years[this.yearIndex].substring(0, 4)
            if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
                return 31
            }
            if (month === 4 || month === 6 || month === 9 || month === 11) {
                return 30
            }
            if (month === 2) {
                return ((year % 100 === 0 && year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)) ? 29 : 28
            }
        },
        getWeekday(year, month, date) {
            if (Number(year) === this.currentDate.getFullYear() &&
                Number(month) === this.currentDate.getMonth() &&
                Number(date) === this.currentDate.getDate()) {
                return '今天'
            }
            let nextDate = new Date(this.currentDate.getTime() + 24 * 60 * 60 * 1000) // 后一天
            if (Number(year) === nextDate.getFullYear() &&
                Number(month) === nextDate.getMonth() &&
                Number(date) === nextDate.getDate()) {
                return '明天'
            }
            let target = new Date(year, month, date)
            switch (target.getDay()) {
            case 1:
                return '星期一'
            case 2:
                return '星期二'
            case 3:
                return '星期三'
            case 4:
                return '星期四'
            case 5:
                return '星期五'
            case 6:
                return '星期六'
            case 0:
                return '星期日'
            }
        },
        onScrollListener(event) {
            let element = event.target
            this.targetElement = element
            if (element && element.scrollTop) {
                let scrollTop = element.scrollTop
                let children = element.children
                let itemHeight = 40 * window.devicePixelRatio
                let offset = scrollTop % itemHeight
                if (offset > itemHeight / 2) {
                    scrollTop = scrollTop - offset + itemHeight
                } else {
                    scrollTop = scrollTop - offset
                }
                children.forEach((child) => {
                    if (child.classList) {
                        child.classList.remove('li-select')
                    }
                })
                let index = Number(scrollTop) / itemHeight + 2
                this.scrollTop = scrollTop
                children[index].classList.add('li-select')
                if (element.id === 'time-year') {
                    this.yearIndex = index
                    this.getMonthsByYear()
                } else if (element.id === 'time-month') {
                    this.monthIndex = index
                    this.getDatesByMonth()
                } else {
                    this.dateIndex = index
                }
                if (this.isScrollFinish) {
                    setTimeout(() => {
                        this.targetElement.scrollTo({
                            top: this.scrollTop,
                            behavior: 'smooth'
                        })
                        console.log('滚动到固定位置')
                    }, 500)
                }
            }
        }
    },
    created() {
        this.getMonthsByYear()
        this.getDatesByMonth()
    },
    activated() {
        window.addEventListener('scroll', this.onScrollListener, true)
        let uls = document.getElementsByClassName('time-column')
        if (uls) {
            uls.forEach((ul) => {
                ul.children[2].classList.add('li-select')
            })
        }
        this.getMonthsByYear()
    },
    deactivated() {
        window.removeEventListener('scroll', this.onScrollListener, true)
    }
}
</script>

<style lang="less" scoped>
    .width-84 {
        width: 84px;
    }
    .width-108 {
        width: 108px;
    }
    .width-120 {
        width: 120px;
    }
    .dialog-time-container {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        bottom: 0;
        z-index: 10;
        .dialog-time-content {
            width: 100%;
            position: absolute;
            bottom: 0;
            background-color: white;
            border-radius: 12px 12px 0 0;
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            transform: translateY(100%);

            .dialog-time-title {
                border-bottom: solid #E1E2E6 1px;
                height: 58px;
                line-height: 58px;
                align-items: center;
                flex-direction: row-reverse;
                display: flex;
                > span {
                    margin-left: 40px;
                    text-align: center;
                    width: calc(100vw - 80px);
                    font-size: 18px;
                    font-weight: bold;
                    color: @color-c1;
                }
                > img {
                    width: 24px;
                    height: 24px;
                    margin-right: 16px;
                }
            }
        }
        .dialog-time-content-hide {
            transform: translateY(0);
        }
        .dialog-time-area {
            position: relative;
            width: 100%;
            height: 214px;
            .dialog-time-select {
                height: 214px;
                width: 100%;
                display: flex;
                position: absolute;
                justify-content: space-between;
                top: 0;
                z-index: 10;
                left: 0;
                padding: 0 32px;
                flex-direction: row;
                .time-column {
                    overflow: scroll;
                    li {
                        height: 40px;
                        line-height: 40px;
                        text-align: center;
                        font-size: 18px;
                        color: @color-c3;
                    }

                    .li-select {
                        height: 54px;
                        font-size: 20px;
                        line-height: 54px;
                        color: @color-c1;
                        font-weight: bold;
                    }
                }

                .time-column::-webkit-scrollbar {
                    display: none;
                }
            }
            .dialog-time-cover {
                height: 54px;
                width: 100%;
                top: 80px;
                position: absolute;
                border-top: solid #E1E2E6 1px;
                border-bottom: solid #E1E2E6 1px;
            }
        }

        .dialog-time-confirm {
            margin: 24px 16px 12px 16px;
            height:50px;
            background:linear-gradient(135deg,rgba(85,122,244,1) 0%,rgba(114,79,255,1) 100%);
            border-radius:25px;
            color: white;
            line-height: 50px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
        }

        .dialog-time-confirm:hover {

        }
    }
</style>
