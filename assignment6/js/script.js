/**
Nanme: Muhammad Muneeb
assignnment six javascript file
**/
/**
 * this funtion appends gives html element to a parent node while parent nodes
 * the chils. or checks if the parent node alredy have the child.
 * https://www.w3schools.com/js/js_functions.asp I learned to create the funtion
 */
function replaceElement(newElement, parentNode)
{
    var previousElement;
    if((previousElement = document.getElementById(newElement.id)) &&
       previousElement.parentNode === parentNode)
       {
        // if id have elements replace it with the existing elemets
        // with same parent.
        parentNode.replaceChild(newElement, previousElement);
    }
     else
    {
        parentNode.appendChild(newElement);
    }
}

if (typeof formControler == "undefined") {
    /**
     * don't use namespace
     * controls the form namespave and and does different jobs for the page
     * @namespace  formControler
     */
        var formControler = (function() {
        var form;
        var errorMinimim = '<Minimum value should be <= Maximum value>';
        var errorMaximum = '<Maximum value should be >= to Minimum value>';

         // create event listner and trigger numbers entered in the form and
         // submit them to draw the table by using printTable, replaceElement()
         // and formControler
        var inTheTable = function()
        {
            form = document.getElementById('form');
            form.addEventListener('submit', function(e)
            {
                // block the form from submition
                e.preventDefault();
                var table = printTable(
                    form.elements['minNumX'].value,
                    form.elements['maxNumX'].value,
                    form.elements['minNumY'].value,
                    form.elements['maxNumY'].value);
                replaceElement(table, form);
            });

            for (var i = 0; i < form.elements.length; i++) {
                if(form.elements[i].type !== 'number') continue;
                // add listner to get the inputs of the form
                form.elements[i].addEventListener('input', validateForm);
            }
        }


         // check to see if user enters valid data
        var validateForm = function()
        {
            var minValue, maxValue;
            if(this.name === 'minNumX' || this.name === 'maxNumX')
            {
                minValue = form.elements['minNumX'];
                maxValue = form.elements['maxNumX'];

            }
            else if(this.name === 'minNumY' || this.name === 'maxNumY')
            {
                minValue = form.elements['minNumY'];
                maxValue = form.elements['maxNumY'];
            }
            if(minValue.length !== 0 && maxValue.length !== 0 &&
               parseInt(minValue.value, 10) > parseInt(maxValue.value, 10))
               {
                // iif min value is greater and have each have value add error
                minValue.setCustomValidity(errorMinimim);
                maxValue.setCustomValidity(errorMaximum);
            }
             else
            {
                // check and erase error
                minValue.setCustomValidity('');
                maxValue.setCustomValidity('');
            }
        }

        return {
            inTheTable: inTheTable
        };
    })();

    // when loaded iniitalize the listner
    document.addEventListener('DOMContentLoaded', formControler.inTheTable);
};


function printTable(minNumValueX, maxNumValueX, minNumValueY, maxNumValueY)
{
    var table = document.createElement('table');
    table.id = 'table';
    var firstRow = true;
    var firstCol = true;

    var i = minNumValueY - 1;
    while(i <= maxNumValueY)
    {
      //creating row
        var tableRow = document.createElement('tr');

        var j = minNumValueX - 1;
        while(j <= maxNumValueX)
        {
            var cell;
            var cellText;
            if(firstRow)
            {
                cell = document.createElement('th');
                if(!firstCol)
                {
                    cellText = document.createTextNode(j);
                    cell.appendChild(cellText);
                }
            }
            else
            {
                if(firstCol)
                {
                    cell = document.createElement('th');
                    cellText = document.createTextNode(i);
                    cell.appendChild(cellText);
                }
                else
                {
                    cell = document.createElement('td');
                    cellText = document.createTextNode(i * j);
                    cell.appendChild(cellText);
                }
            }
            //Adding cell to a row
            tableRow.appendChild(cell);
            firstCol = false;
            j++;
        }
        // adding row to a table
        table.appendChild(tableRow);
        firstRow = false;
        firstCol = true;
        i++;
    }
    return table;
}
