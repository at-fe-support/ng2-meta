"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/map");
var meta_module_1 = require("./meta.module");
var isDefined = function (val) { return typeof val !== 'undefined'; };
var MetaService = (function () {
    function MetaService(router, document, titleService, activatedRoute, metaConfig) {
        var _this = this;
        this.router = router;
        this.document = document;
        this.titleService = titleService;
        this.activatedRoute = activatedRoute;
        this.metaConfig = metaConfig;
        this.router.events
            .filter(function (event) { return (event instanceof router_1.NavigationEnd); })
            .map(function () { return _this._findLastChild(_this.activatedRoute); })
            .subscribe(function (routeData) {
            _this._updateMetaTags(routeData.meta);
        });
    }
    MetaService.prototype._findLastChild = function (activatedRoute) {
        var snapshot = activatedRoute.snapshot;
        var child = snapshot.firstChild;
        while (child.firstChild !== null) {
            child = child.firstChild;
        }
        return child.data;
    };
    MetaService.prototype._getOrCreateMetaTag = function (name) {
        var og = name.match('og');
        var el = og !== null ? this.document.querySelector("meta[property='" + name + "']") : this.document.querySelector("meta[name='" + name + "']");
        if (!el) {
            el = this.document.createElement('meta');
            el.setAttribute(og !== null ? 'property' : 'name', name);
            this.document.head.appendChild(el);
        }
        return el;
    };
    MetaService.prototype._updateMetaTags = function (meta) {
        var _this = this;
        if (meta === void 0) { meta = {}; }
        if (meta.disableUpdate) {
            return false;
        }
        this.setTitle(meta.title, meta.titleSuffix);
        Object.keys(meta).forEach(function (key) {
            if (key === 'title' || key === 'titleSuffix') {
                return;
            }
            _this.setTag(key, meta[key]);
        });
        Object.keys(this.metaConfig.defaults).forEach(function (key) {
            if (key in meta || key === 'title' || key === 'titleSuffix') {
                return;
            }
            _this.setTag(key, _this.metaConfig.defaults[key]);
        });
    };
    MetaService.prototype.setTitle = function (title, titleSuffix) {
        var titleElement = this._getOrCreateMetaTag('title');
        var ogTitleElement = this._getOrCreateMetaTag('og:title');
        var titleStr = isDefined(title) ? title : (this.metaConfig.defaults['title'] || '');
        if (this.metaConfig.useTitleSuffix) {
            titleStr += isDefined(titleSuffix) ? titleSuffix : (this.metaConfig.defaults['titleSuffix'] || '');
        }
        titleElement.setAttribute('content', titleStr);
        ogTitleElement.setAttribute('content', titleStr);
        this.titleService.setTitle(titleStr);
        return this;
    };
    MetaService.prototype.setTag = function (tag, value) {
        if (tag === 'title' || tag === 'titleSuffix') {
            throw new Error("Attempt to set " + tag + " through 'setTag': 'title' and 'titleSuffix' are reserved tag names.\n      Please use 'MetaService.setTitle' instead");
        }
        var tagElement = this._getOrCreateMetaTag(tag);
        var tagStr = isDefined(value) ? value : (this.metaConfig.defaults[tag] || '');
        tagElement.setAttribute('content', tagStr);
        if (tag === 'description') {
            var ogDescElement = this._getOrCreateMetaTag('og:description');
            ogDescElement.setAttribute('content', tagStr);
        }
        return this;
    };
    return MetaService;
}());
MetaService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject(platform_browser_1.DOCUMENT)),
    __param(4, core_1.Inject(meta_module_1.META_CONFIG)),
    __metadata("design:paramtypes", [router_1.Router, Object, platform_browser_1.Title, router_1.ActivatedRoute, Object])
], MetaService);
exports.MetaService = MetaService;
//# sourceMappingURL=meta.service.js.map