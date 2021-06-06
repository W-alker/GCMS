<template>
  <div id="map"></div>
</template>

<script>
import BMapGL from "BMapGL";

export default {
  name: "Map",
  data() {
    return {
      points: [
        [117.202439, 31.758872],
        [117.202807, 31.75911],
        [117.203122, 31.759394],
        [117.203405, 31.59659],
        [117.203724, 31.759916],
        [117.203122, 31.758542],
        [117.203459, 31.758542],
        [117.203773, 31.758795],
        [117.204097, 31.759072],
        [117.204254, 31.759624],
        [117.203445, 31.75969],
        [117.20332, 31.76038],
        [117.2641, 31.759851],
        [117.205273, 31.761064],
        [117.206333, 31.760722],
        [117.205269, 31.761701],
        [117.206571, 31.762226],
        [117.208319, 31.761716],
        [117.207398, 31.761731],
        [117.208211, 31.76106],
        [117.20265, 31.75987],
        [117.20195, 31.759667],
        [],
      ],
    };
  },
  methods: {
    createMap() {
      /* eslint-disable */
      // 创建Map实例
      const map = new BMapGL.Map("map");
      // 初始化地图,设置中心点坐标和地图级别
      map.centerAndZoom(new BMapGL.Point(117.204384, 31.760012), 20);
      //3d视角
      map.setHeading(64.5);
      map.setTilt(60);
      //缩放和比例尺控件
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      const scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
      map.addControl(scaleCtrl);
      const zoomCtrl = new BMapGL.ZoomControl(); // 添加比例尺控件
      map.addControl(zoomCtrl);
      // 创建定位控件
      const locationControl = new BMapGL.LocationControl({
        // 控件的停靠位置（可选，默认左上角）
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        // 控件基于停靠位置的偏移量（可选）
        offset: new BMapGL.Size(20, 20),
      });
      // 将控件添加到地图上
      map.addControl(locationControl);
      // 添加定位事件
      locationControl.addEventListener("locationSuccess", function (e) {
        var address = "";
        address += e.addressComponent.province;
        address += e.addressComponent.city;
        address += e.addressComponent.district;
        address += e.addressComponent.street;
        address += e.addressComponent.streetNumber;
        alert("当前定位地址为：" + address);
      });
      locationControl.addEventListener("locationError", function (e) {
        alert(e.message);
      });

      //添加回收点标记作为示例
      for (let i of this.points)
        map.addOverlay(new BMapGL.Marker(new BMapGL.Point(i[0], i[1])));
    },
  },
  mounted() {
    this.createMap();
  },
};
</script>
<style scoped lang="scss">
#map {
  min-height: 100vh;
  width: 100%;
  height: 100%;
}
</style>