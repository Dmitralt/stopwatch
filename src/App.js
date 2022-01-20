import "./App.css";
import React, { useState, useEffect } from "react";
import { interval, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Showtime from "./scripts/Display_timer";

var timestamp = require("timestamp");
let last_timestamp = 0;
function App() {
  const [time, set_stopwatch_value] = useState(0);
  const [whatch, stopwatch_runing] = useState(false);

  useEffect(() => {
    const unsubscribe = new Subject();
    interval(10)
      .pipe(takeUntil(unsubscribe))
      .subscribe(() => {
        if (whatch) {
          set_stopwatch_value((val) => val + 1);
        }
      });
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [whatch]);

  let delay_value = 300;
  const wait = () => {
    let curent_timestamp = timestamp();
    console.log(last_timestamp);
    if (curent_timestamp - last_timestamp < delay_value) {
      if (time !== 0) {
        stopwatch_runing(false);
      }
    }

    last_timestamp = curent_timestamp;
  };

  const start = () => {
    stopwatch_runing(true);
  };
  const stop = () => {
    stopwatch_runing(false);
    set_stopwatch_value(0);    
  };
  const reset = () => {
    stopwatch_runing(false);
    set_stopwatch_value(0);    
    start();
  };

  return (
    <div className="App">
      <div className="main">
        <div className="clock">
          <div className="app-name">Stopwatch</div>
          <div className="stopwatch">
            <Showtime time={time} />

            <div>
              <div>
                
                <button
                  className="stopwatch-button stopwatch-button-start"
                  onClick={start}
                >
                  start
                </button>

                <button
                  className="stopwatch-button stopwatch-button-stop"
                  onClick={stop}
                >
                  stop
                </button>
                <button
                  className="stopwatch-button stopwatch-button-wait"                  
                  onClick={wait}
                >
                  wait
                </button>

                <button
                  className="stopwatch-button stopwatch-button-reset"
                  onClick={reset}
                >
                  reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
