<template>
  <div class="chart-wrapper">
    <canvas :id="componentId"></canvas>
  </div>
</template>

<script>
const F2 = require('@antv/f2')
export default {
    components: {},
    props: {
        actualPercent: {
            type: String,
            default() {
                return ''
            }
        },
        actualText: {
            type: String,
            default() {
                return ''
            }
        },
        chartType: {
            type: String,
            default() {
                return ''
            }
        }
    },
    data() {
        return {
            chartColor: '',
            componentId: '',
            textId: ''
        }
    },
    created() {
        switch (this.chartType) {
        case '1':
            this.chartColor = 'l(0) 0:#557AF4 1:#724FFF'
            this.componentId = 'mountNode1'
            this.textId = 'text1'
            break
        case '2':
            this.chartColor = 'l(0) 0:#FFB536 1:#FF8F39'
            this.componentId = 'mountNode2'
            this.textId = 'text2'
            break
        case '3':
            this.chartColor = 'l(0) 0:#FF6969 1:#F7486E'
            this.componentId = 'mountNode3'
            this.textId = 'text3'
            break
        default:
            break
        }
    },
    watch: {
        actualPercent(val) {
            this.cricleChart(this.componentId, val, this.chartColor, this.textId, this.actualText)
        }
    },
    methods: {
        cricleChart(componentId, actualPercent, chartColor, text, actualText) {
            var _F = F2
            var Shape = _F.Shape
            var G = _F.G
            var Util = _F.Util
            var Global = _F.Global
            var Vector2 = G.Vector2

            // 极坐标下带圆角的柱子，只对极坐标生效

            Shape.registerShape('interval', 'polar-tick', {
                draw: function draw(cfg, container) {
                    var points = this.parsePoints(cfg.points)
                    var style = Util.mix(
                        {
                            stroke: cfg.color
                        },
                        Global.shape.interval,
                        cfg.style
                    )

                    var newPoints = points.slice(0)
                    if (this._coord.transposed) {
                        newPoints = [points[0], points[3], points[2], points[1]]
                    }

                    var center = cfg.center
                    var x = center.x
                    var y = center.y

                    var v = [1, 0]
                    var v0 = [newPoints[0].x - x, newPoints[0].y - y]
                    var v1 = [newPoints[1].x - x, newPoints[1].y - y]
                    var v2 = [newPoints[2].x - x, newPoints[2].y - y]

                    var startAngle = Vector2.angleTo(v, v1)
                    var endAngle = Vector2.angleTo(v, v2)
                    var r0 = Vector2.length(v0)
                    var r = Vector2.length(v1)

                    if (startAngle >= 1.5 * Math.PI) {
                        startAngle = startAngle - 3 * Math.PI
                    }

                    if (endAngle >= 1.5 * Math.PI) {
                        endAngle = endAngle - 2 * Math.PI
                    }

                    var lineWidth = r - r0
                    var newRadius = r - lineWidth / 2

                    return container.addShape('Arc', {
                        className: 'interval',
                        attrs: Util.mix(
                            {
                                x: x,
                                y: y,
                                startAngle: startAngle,
                                endAngle: endAngle,
                                r: newRadius,
                                lineWidth: lineWidth,
                                lineCap: 'round'
                            },
                            style
                        )
                    })
                }
            })
            var data = [
                {
                    const: 'a',
                    actual: Number(actualPercent),
                    expect: 100
                }
            ]
            var chart = new F2.Chart({
                id: componentId,
                padding: [0, 30, 60],
                pixelRatio: window.devicePixelRatio
            })
            chart.source(data, {
                actual: {
                    max: 100,
                    min: 0,
                    nice: false
                }
            })
            chart.coord('polar', {
                transposed: true,
                innerRadius: 0.8,
                startAngle: -Math.PI * 1.25,
                endAngle: Math.PI * 0.25
            })
            chart.axis(false)
            chart
                .interval()
                .position('const*expect')
                .shape('polar-tick')
                .size(10)
                .color('#F4F5F7')
                .animate(false) // 背景条
            chart
                .interval()
                .position('const*actual')
                .shape('polar-tick')
                .size(10)
                .color(chartColor)
                .animate({
                    appear: {
                        duration: 1100,
                        easing: 'linear',
                        animation: function animation(shape, animateCfg) {
                            var startAngle = shape.attr('startAngle')
                            var endAngle = shape.attr('endAngle')
                            if (startAngle > endAngle) {
                                // -Math.PI/2 到 0
                                endAngle += Math.PI * 2
                            }
                            shape.attr('endAngle', startAngle)
                            shape
                                .animate()
                                .to(
                                    Util.mix(
                                        {
                                            attrs: {
                                                endAngle: endAngle
                                            }
                                        },
                                        animateCfg
                                    )
                                )
                                .onUpdate(function(frame) {
                                    document.getElementById(text).innerText =
                    parseInt(frame * Number(actualPercent)) + '%'
                                })
                        }
                    }
                }) // 实际进度
            chart.guide().html({
                position: ['50%', '50%'],
                html: `<div style="white-space: nowrap;text-align:center;"><p id="${text}" style="font-size: 30px;color: #2A2B33;margin:0;font-weight: bold;">0</p><p style="font-size: 22px;color: #B2B5C1;margin:0;margin-top: 4px;">${actualText}</p></div>`
            })
            chart.render()
        }
    }
}
</script>

<style lang='less' scoped>
canvas#mountNode1 {
  border-radius: 5px;
  //   background-color: #1890ff;
  //   background-image: linear-gradient(#246bff, #2797ff);
  width: 100%;
  height: 113px;
}
canvas#mountNode2 {
  border-radius: 5px;
  //   background-color: #1890ff;
  //   background-image: linear-gradient(#246bff, #2797ff);
  width: 100%;
  height: 113px;
}
canvas#mountNode3 {
  border-radius: 5px;
  //   background-color: #1890ff;
  //   background-image: linear-gradient(#246bff, #2797ff);
  width: 100%;
  height: 113px;
}
</style>
