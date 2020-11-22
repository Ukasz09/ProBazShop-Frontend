import { FormControl, FormGroup } from '@angular/forms';
import { FormModel } from 'src/app/model/form/form-model';

export class FormLogicUtils {
  static makeFormFromModel(model: FormModel): FormGroup {
    let form = new FormGroup({});
    for (let property of model.getPropertiesNameList()) {
      let control = new FormControl(
        model.getProperty(property).defaultValue,
        model.getProperty(property).validators
      );
      form.addControl(property, control);
    }
    return form;
  }
}
