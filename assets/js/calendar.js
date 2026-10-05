/* Hollyhock Lane — month-by-month garden calendar with a USDA zone selector.
   Choose your zone and the task list adjusts. General guidance only; local timing
   varies, so your regional Cooperative Extension office is the best final word. */
(function () {
  "use strict";
  var host = document.getElementById("garden-calendar");
  if (!host) return;

  // each task lists the USDA zones (3–10) it applies to
  var ALL = [3, 4, 5, 6, 7, 8, 9, 10];
  var MONTHS = [
    ["January", [
      ["Plan this year's beds and order seeds while the catalogs are fresh.", ALL],
      ["Sow cool-season greens outdoors.", [8, 9, 10]],
      ["Brush heavy snow off shrubs so branches don't snap.", [3, 4, 5, 6]]
    ]],
    ["February", [
      ["Start slow seeds such as onions and leeks indoors.", ALL],
      ["Prune roses late in the month before growth begins.", [7, 8, 9, 10]],
      ["Prune dormant fruit trees before the buds swell.", [3, 4, 5, 6, 7]]
    ]],
    ["March", [
      ["Start tomatoes and peppers indoors under a sunny window.", ALL],
      ["Sow peas and hardy greens directly outdoors.", [6, 7, 8, 9, 10]],
      ["Divide crowded perennials as they begin to wake.", ALL]
    ]],
    ["April", [
      ["Prepare beds with compost and a gentle weeding.", ALL],
      ["Harden off indoor seedlings slowly before planting out.", [3, 4, 5, 6]],
      ["Plant out hardy annuals and cool-season flowers.", [7, 8, 9, 10]]
    ]],
    ["May", [
      ["After your last frost, plant tomatoes, beans, and squash.", ALL],
      ["Wait for warm soil — your last frost may still be ahead.", [3, 4, 5]],
      ["Mulch beds to hold moisture as the days warm.", ALL]
    ]],
    ["June", [
      ["Deadhead spent blooms to keep the flowers coming.", ALL],
      ["Water deeply in the early morning, especially new plants.", ALL],
      ["Give lettuce some afternoon shade before it bolts.", [8, 9, 10]]
    ]],
    ["July", [
      ["Keep up steady watering; a good mulch checks the heat.", ALL],
      ["Harvest beans, zucchini, and herbs often to keep them producing.", ALL],
      ["Sow a quick second crop of greens.", [3, 4, 5, 6]]
    ]],
    ["August", [
      ["Sow fall crops such as spinach, kale, and radish.", ALL],
      ["Order spring-flowering bulbs to plant in autumn.", ALL],
      ["Start cool-season flowers from seed for a fall display.", [8, 9, 10]]
    ]],
    ["September", [
      ["Divide and replant crowded perennials.", ALL],
      ["Plant spring bulbs as the soil begins to cool.", [3, 4, 5, 6, 7]],
      ["Begin the fall vegetable garden in earnest.", [8, 9, 10]]
    ]],
    ["October", [
      ["Plant garlic now for a harvest next summer.", ALL],
      ["Rake fallen leaves and add them to the compost.", ALL],
      ["Tuck beds in with mulch before the first hard frost.", [3, 4, 5, 6]]
    ]],
    ["November", [
      ["Clean, dry, and oil your tools before winter storage.", ALL],
      ["Protect tender roots with a blanket of mulch.", [3, 4, 5, 6]],
      ["Plant trees and shrubs into cool, moist soil.", [7, 8, 9, 10]]
    ]],
    ["December", [
      ["Rest, and dream over next year's seed catalogs.", ALL],
      ["Check any stored bulbs and dahlias for soft spots.", [3, 4, 5, 6, 7]],
      ["Harvest winter greens and citrus.", [8, 9, 10]]
    ]]
  ];

  function render(zone) {
    var rows = MONTHS.map(function (m) {
      var tasks = m[1].filter(function (t) { return t[1].indexOf(zone) !== -1; })
        .map(function (t) { return "<li>" + t[0] + "</li>"; }).join("");
      return "<tr><th scope=\"row\">" + m[0] + "</th><td><ul>" + tasks + "</ul></td></tr>";
    }).join("");
    host.querySelector("tbody").innerHTML = rows;
  }

  host.innerHTML =
    '<div class="zonepick"><label for="zoneSel"><strong>Your USDA hardiness zone:</strong></label>' +
    '<select id="zoneSel" aria-label="USDA hardiness zone">' +
    ALL.map(function (z) { return '<option value="' + z + '"' + (z === 6 ? " selected" : "") + ">Zone " + z + "</option>"; }).join("") +
    '</select><button type="button" class="btn btn--ghost" onclick="window.print()">Print this calendar</button></div>' +
    '<p class="tip"><span class="tip__label">Not sure of your zone?</span> Search the USDA Plant Hardiness Zone Map at <a href="https://planthardiness.ars.usda.gov" rel="noopener">planthardiness.ars.usda.gov</a> by entering your ZIP code.</p>' +
    '<div class="table-wrap"><table><caption>A gentle month-by-month guide — adjust the zone above for your area</caption>' +
    '<thead><tr><th scope="col">Month</th><th scope="col">What to do this month</th></tr></thead><tbody></tbody></table></div>';

  render(6);
  document.getElementById("zoneSel").addEventListener("change", function (e) { render(parseInt(e.target.value, 10)); });
})();
