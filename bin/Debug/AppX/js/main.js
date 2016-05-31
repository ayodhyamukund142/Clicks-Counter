(function() {
  'use strict';
  var app = WinJS.Application;
  var activation = Windows.ApplicationModel.Activation;
  var TextView = 0;
  var string;
  var appData = Windows.Storage.ApplicationData.current;
  var roamingSettings = appData.roamingSettings;
  app.onactivated = function (args) {
    if (args.detail.kind === activation.ActivationKind.launch) {
      if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
          // TODO: This application has been newly launched. Initialize your application here.
          TextView = roamingSettings.values["count"];
          document.body.style.backgroundColor = roamingSettings.values["colour"];
          if (!document.body.style.backgroundColor)
              document.body.style.backgroundColor = "white";
          if (!TextView)
              TextView = 0;
          document.getElementById("counter").innerText = ("Number of Clicks : "+TextView);
      } else {
        // TODO: This application has been reactivated from suspension.
        // Restore application state here.
      }
      args.setPromise(WinJS.UI.processAll().then(function() {
        // TODO: Your code here.
      }));

      var clickButton = document.getElementById("cli");
      clickButton.addEventListener("click", buttonClickHandler, false);
      clickButton.addEventListener("click", colorchange, false);
      var resetButton = document.getElementById("reset");
      resetButton.addEventListener("click", resetHandler, false);
      resetButton.addEventListener("click", resetcolor, false);
    }
  };
  app.oncheckpoint = function (args) {
    // TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
    // You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
    // If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
  };
  
  function buttonClickHandler(eventInfo)
  {
      TextView++;
      string = "Number of Clicks : " + TextView;
      document.getElementById("counter").innerText = string;
      roamingSettings.values["count"] = TextView;
  }

  function resetHandler(eventInfo)
  {
      TextView = 0;
      string = "Number of Clicks : 0";
      document.getElementById("counter").innerText = string;
      roamingSettings.values["count"] = TextView;
  }

  function colorchange(eventInfo)
  {
      if (document.body.style.backgroundColor == "white")
          document.body.style.backgroundColor = "red";
      else if (document.body.style.backgroundColor == "red")
          document.body.style.backgroundColor = "yellow";
      else if (document.body.style.backgroundColor == "yellow")
          document.body.style.backgroundColor = "green";
      else if (document.body.style.backgroundColor == "green")
          document.body.style.backgroundColor = "blue";
      else if (document.body.style.backgroundColor == "blue")
          document.body.style.backgroundColor = "fuchsia";
      else if (document.body.style.backgroundColor == "fuchsia")
          document.body.style.backgroundColor = "white";
      roamingSettings.values["colour"] = document.body.style.backgroundColor;
  }

  function resetcolor(eventInfo)
  {
      document.body.style.backgroundColor = "white";
      roamingSettings.values["colour"] = document.body.style.backgroundColor;
  }

  app.start();
}());
