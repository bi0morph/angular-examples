/* JavaScript Document */

  // Необходимая информация
  // коэффициент для преобразования леменов в ватт для разных ламп
  var inc_conversion = .0625,
    hal_conversion = .0450,
    cfl_conversion = .0146,
    led_conversion = .0125;

  var current_lumens = 1600;
  // пример получения ватт для 1600 люменов для лампы накаливания
  inc_wattage = (current_lumens * inc_conversion).toFixed(1); // 100

  var hoursPerDay = 1; // часов в день
  var cost = 12 / 100; // цена 12 центов э то 0.12 долларов
  // пример определения стоимости в год для лампы накаливания
  var inc_cost = (((inc_wattage * 365 * hoursPerDay) /1000) * cost).toFixed(2);
