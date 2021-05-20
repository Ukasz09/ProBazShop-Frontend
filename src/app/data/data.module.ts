import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from '../core/ensure-module-loaded-once.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DataModule extends EnsureModuleLoadedOnceGuard {
  // Make sure that the core module has been imported only in the root module
  constructor(@Optional() @SkipSelf() parentModule: DataModule) {
    super(parentModule);
  }
}
