2023-03-28
1.项目结构
 主包：com.qshsoft
    控制器：controller
        基类控制器文件夹：     base
                    抽象基类：AbstractRestfulController
                                    抽象类继承 1. 实体类 ：AbstractBaseEntity
                                              2. 数据应用类(存储库类,主要是数据操作类)：BaseRepository
                                              3.EntityPathBase 不清楚是什么 基类
                                    抽象接口类 1.数据绑定特性  :DataBinderTrait
                                    看一下

        业务接口类控制器文件夹：security
    数据源：data
    基础设施：infrastructure
    工具类：util
    初始化类：init