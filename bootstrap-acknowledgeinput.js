/* =========================================================
 * bootstrap-acknowledgeinput.js
 * https://github.com/AverageMarcus/Bootstrap-AcknowledgeInputs
 * =========================================================
 * Requirements:
 * --------------
 * jQuery (1.9.1 recommended) - http://jquery.com/
 * Bootstrap (css) - http://twitter.github.com/bootstrap
 *
 * Recommended: 
 * --------------
 * Font-Awesome - http://fortawesome.github.com/Font-Awesome/
 * (This allows coloured icons)
 *
 * ========================================================= 
 * Copyright 2013 Marcus Noble
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function( $ ) {   
    "use strict"; 
    // Acknowledge Inputs
    // TODO: Support select listbox
    
    $.fn.acknowledgeinput = function(options){
        var acknowledgeVars = {
            success_color: "#468847",
            danger_color: "#bd362f",
            icon_success: "icon-ok",
            icon_danger: "icon-warning-sign",
            update_on: "change"
        };

        var updateIcons = function (inputEl) {
            function modify_classes(isSuccess, iconClass) {
                var colour = isSuccess ? acknowledgeVars.success_color : acknowledgeVars.danger_color;
                inputEl.parent().find('[data-role=acknowledgement]').css('color', colour).find('i').removeClass().addClass(iconClass);
            }

            //Setup default
            inputEl.parent().find('[data-role=acknowledgement]').addClass('add-on').find('i').removeClass();
            var re;
            var data_type = inputEl.data('type') === undefined ? "text" : inputEl.data('type');
            var required = inputEl.attr("required") === undefined ? false : inputEl.attr("required").toLowerCase() === "required";

            if (data_type.toLowerCase() === "text") {
                if (inputEl.val() !== "") {
                    modify_classes(true, acknowledgeVars.icon_success);
                } else if (required) {
                    modify_classes(false, acknowledgeVars.icon_danger);
                }
            } else if (data_type.toLowerCase() === "email") {
                re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var isEmail = re.test(inputEl.val());

                if (inputEl.val() !== "" && isEmail) {
                    modify_classes(true, acknowledgeVars.icon_success);
                } else if (required || (inputEl.val() !== "" && !isEmail)) {
                    modify_classes(false, acknowledgeVars.icon_danger);
                }
            } else if (data_type.toLowerCase() === "tel") {
                re = /^(\+)?( |-|\(|\)|[0-9]){4,50}$/;
                var isTel = re.test(inputEl.val());

                if (inputEl.val() !== "" && isTel) {
                    modify_classes(true, acknowledgeVars.icon_success);
                } else if (required || (inputEl.val() !== "" && !isTel)) {
                    modify_classes(false, acknowledgeVars.icon_danger);
                }
            }

            
        };

        $.extend(acknowledgeVars, options);

        $('[data-role=acknowledge-input]').find('input:not([type=radio]):not([type=checkbox]),textarea,select').each(function () {
            updateIcons($(this));
        }).on(acknowledgeVars.update_on, function () {
            updateIcons($(this));
        });
    };
}) ( window.jQuery );