<template>
  <div class="date">
    <div class="one" style="display: flex">
      <div id="pie" style="width: 400px;height: 250px;"></div>
      <div id="tree" style="width: 600px;height: 250px;"></div>
    </div>
    <div class="two" style="display: flex">
      <div id="columnar" style="width: 340px;height: 250px;"></div>
      <div id="funnel" style="width: 300px;height: 250px;"></div>
      <div id="line" style="width: 340px;height: 250px;"></div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {Index} from "../../../network/home";
  export default {
    name: "Data",
    mounted() {
      this.getPie()
      this.getTree()
      this.getColumnar()
      this.getFunnel()
      this.getLine()
    },
    methods: {
      async getPie() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('pie'), 'light');
        let result = await Index(this, 'category', '获取数据');
        let data = result.data
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '文章数量统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '文章数 : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 0,
            top: 20,
            bottom: 20,
            data: data,
          },
          series: [
            {
              name: '姓名',
              type: 'pie',
              radius: '60%',
              center: ['35%', '50%'],
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      async getTree() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('tree'), 'light');
        let result = await Index(this,'category', '获取分类', {}, false);

        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '分类树状结构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series:[
            {
              type: 'tree',
              data: [{name:'blog', children:result.data}],
              top: '10%',
              left: '30%',
              bottom: '20%',
              right: '18%',

              symbolSize: 7,

              label: {
                position: 'left',
                verticalAlign: 'middle',
                align: 'right'
              },

              leaves: {
                label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
                }
              },

              expandAndCollapse: true,

              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      async getColumnar() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('columnar'), 'light');
        let result = await Index(this, 'data', '获取数据', {type: 'columnar'}, false);

        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '点赞榜',
            subtext: '点赞数前5的文章',
            left: 'center'
          },
          color: ['#db97d5'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'value'
            }
          ],
          yAxis: [
            {
              type: 'category',
              data: result['name'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          series: [
            {
              name: '点赞数',
              type: 'bar',
              barWidth: '70%',
              data: result['value']
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      async getFunnel() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('funnel'), 'light');
        let result = await Index(this, 'data', '获取数据', {type: 'funnel'}, false);
        // 指定图表的配置项和数据
        let option = {
          title: {
            text: '点评榜',
            subtext: '评论数前5的文章',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}%"
          },
          series: [
            {
              name: '漏斗图',
              type: 'funnel',
              left: '0%',
              top: 80,
              //x2: 80,
              bottom: 60,
              width: '100%',
              // height: {totalHeight} - y - y2,
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '80%',
              sort: 'descending',
              gap: 2,
              label: {
                show: true,
                position: 'left'
              },
              labelLine: {
                length: 10,
                lineStyle: {
                  width: 2,
                  type: 'solid'
                }
              },
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2
              },
              data: result
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      },
      async getLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('line'), 'light');
        let result = await Index(this, 'data', '获取数据', {type: 'line'}, false);

        // 指定图表的配置项和数据
        let option = option = {
          title: {
            text: '阅读榜',
            subtext: '阅读数前5的文章',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            boundaryGap: false,
            data: result['name']
          },

          series: [{
            data: result['value'],
            type: 'line',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {}
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>

</style>