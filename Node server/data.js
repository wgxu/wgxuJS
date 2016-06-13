/**
 * 此文件为Get、POST请求返回的数据注册文件
 * @author: xuwg
 * @datetime: 2016/3/11
 * @decribute:
 *     请求路径都无后缀名，并把需要返回的数据都在data对象中进行同名注册，否则一律错误提示
 */
var data = {
    //暂无数据
    "noData": {
        "Statu": "1",
        "data": [{
            "message": "no data"
        }],
        "SysErr": ""
    },
    //数据错误
    "errData": {
        "Statu": "0",
        "data": [{
            "message": "data error"
        }],
        "SysErr": ""
    },

    //test 接口
    "test":{
        "Statu": "1",
        "data": [{
            "message": "ok,come on"
        }],
        "SysErr": ""
    },

    //GetValueListByKey
    GetValueListByKey: {
        Data: [{
            "id" : "0",
            "Name": "在家"
        },{
            "id" : "1",
            "Name": "不在家"
        }]
    },

    //GetAreaByPid
    GetAreaByPid: {
        Data: [{
            AreaID: '1',
            AreaName: '池州市0',
            IsParent: true
        },{
            AreaID: '3',
            AreaName: '池州市1',
            IsParent: true
        },{
            AreaID: '2',
            AreaName: '池州市2',
            IsParent: false
        },{
            AreaID: '4',
            AreaName: '池州市3',
            IsParent: false
        },{
            AreaID: '5',
            AreaName: '池州市4',
            IsParent: false
        },{
            AreaID: '6',
            AreaName: '池州市5',
            IsParent: false
        },]
    },
    GetPoliceByAreaId : {
        Data: [{
            OrgID: '1',
            OrgName: '池州市0派出所',
            IsParent: true
        },{
            OrgID: '3',
            OrgName: '池州市1派出所',
            IsParent: true
        }]
    }
};

module.exports = data;