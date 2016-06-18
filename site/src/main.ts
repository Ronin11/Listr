import {bootstrap}    from '@angular/platform-browser-dynamic';

import {provide} from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import {AppComponent} from './app/app.component';

bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
])