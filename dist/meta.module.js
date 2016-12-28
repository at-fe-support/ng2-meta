"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var meta_service_1 = require('./meta.service');
exports.META_CONFIG = new core_1.OpaqueToken('meta config');
var MetaModule = (function () {
    function MetaModule() {
    }
    MetaModule.forRoot = function (metaConfig) {
        if (metaConfig === void 0) { metaConfig = { useTitleSuffix: false, defaults: {} }; }
        return {
            ngModule: MetaModule,
            providers: [
                { provide: exports.META_CONFIG, useValue: metaConfig },
                meta_service_1.MetaService
            ]
        };
    };
    MetaModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [router_1.RouterModule]
                },] },
    ];
    /** @nocollapse */
    MetaModule.ctorParameters = function () { return []; };
    return MetaModule;
}());
exports.MetaModule = MetaModule;
//# sourceMappingURL=meta.module.js.map