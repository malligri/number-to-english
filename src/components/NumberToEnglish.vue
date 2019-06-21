<template>
  <div class="wrap">
    <h2>{{ msg }}</h2>
    <label for="insertedNumber">Input</label>
    <input
      id="insertedNumber"
      type="text"
      placeholder="Insert number"
      @keyup="convertToWords"
      @input="insertedNumber = $event.target.value"
    />
    <label for="letterNumber">Output</label>
    <textarea
      rows="10"
      id="letterNumber"
      :value="outputEnglish"
      readonly
    ></textarea>
  </div>
</template>

<script>
const basicNumbers = {
  TEN: 10,
  HUNDRED: 100,
  THOUSAND: 1000,
  MILLION: 1000000,
  BILLION: 1000000000,
  TRILLION: 1000000000000,
  QUADRILLION: 1000000000000000,
  MAX: 2000000000000000
};

const SMALLER_THAN_TWENTY = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];

const TENTHS_SMALLER_THAN_HUNDRED = [
  "zero",
  "ten",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety"
];

export default {
  name: "NumberToEnglish",
  props: {
    msg: String
  },
  data: function() {
    return {
      insertedNumber: null,
      outputEnglish: null
    };
  },
  methods: {
    /**
     * TODO: Rimangono da gestire:
     * - i decimali
     * - alcune situazioni dove la parola "AND" non si comporta correttamente
     * - errori come la presenza di stringhe nell'input o il valore numerico Infinity
     */
    numberToEnglish(number) {
      let remainder,
        word,
        words = arguments[1];

      // Controllo se è stato inserito zero altrimenti
      // preparo l'array con le parole
      if (number === 0) {
        return !words ? "zero" : words.join(" ").replace(/and$/, "");
      }

      // Prima esecuzione del ciclo
      if (!words) {
        words = [];
      }

      // Inserisco "negative" nell'array di parole visto
      // che il valore è sotto lo zero; poi prendo la parte
      // assoluta del numero inserito
      if (number < 0) {
        words.push("negative");
        number = Math.abs(number);
      }

      // Se il numero è minore di 20, prendo direttamente il
      // suo corrispondente in lettere dall'array "SMALLER_THAN_TWENTY"
      if (number < 20) {
        remainder = 0;
        word = SMALLER_THAN_TWENTY[number];

        // Se il numero è minore di 100, mi occupo prima delle sue decine con array "TENTHS_SMALLER_THAN_HUNDRED"
        // poi prendo le unità e vado a cercare il corrispondente valore in lettere
        // nell'array "SMALLER_THAN_TWENTY" separandole con carattere "-"
      } else if (number < basicNumbers.HUNDRED) {
        remainder = number % basicNumbers.TEN;
        word =
          TENTHS_SMALLER_THAN_HUNDRED[Math.floor(number / basicNumbers.TEN)];
        if (remainder) {
          word += "-" + SMALLER_THAN_TWENTY[remainder];
          remainder = 0;
        }

        // Se il numero è minore di 1000 mi occupo delle centinaia (prima cifra a sinistra)
        // inviandole in maniera ricorsiva alla funzione ed attaccando "hundred and" (linea 132).
        // La rimanente parte del numero viene assegnata, tramite operazione di modulo,
        // alla variabile REMAINDER e trattata sopra.
        // Per i numeri via via più grossi, viene usata la stessa procedura ricorsivamente,
        // andando a ridurre sempre di più i numeri inseriti
      } else if (number < basicNumbers.THOUSAND) {
        remainder = number % basicNumbers.HUNDRED;
        word =
          this.numberToEnglish(Math.floor(number / basicNumbers.HUNDRED)) +
          " hundred and";
      } else if (number < basicNumbers.MILLION) {
        remainder = number % basicNumbers.THOUSAND;
        word =
          this.numberToEnglish(Math.floor(number / basicNumbers.THOUSAND)) +
          " thousand and";
      } else if (number < basicNumbers.BILLION) {
        remainder = number % basicNumbers.MILLION;
        word =
          this.numberToEnglish(Math.floor(number / basicNumbers.MILLION)) +
          " million and";
      } else if (number < basicNumbers.TRILLION) {
        remainder = number % basicNumbers.BILLION;
        word =
          this.numberToEnglish(Math.floor(number / basicNumbers.BILLION)) +
          " billion and";
      } else if (number < basicNumbers.QUADRILLION) {
        remainder = number % basicNumbers.TRILLION;
        word =
          this.numberToEnglish(Math.floor(number / basicNumbers.TRILLION)) +
          " trillion and";

        // arrivo massimo a 2 Quadrillion
      } else if (number <= basicNumbers.MAX) {
        remainder = number % basicNumbers.QUADRILLION;
        word =
          this.numberToEnglish(Math.floor(number / basicNumbers.QUADRILLION)) +
          " quadrillion and";
      } else {
        // qui gestisco errori
        return "Error: the inserted value is not correct or too high";
      }

      words.push(word);
      return this.numberToEnglish(remainder, words);
    },
    convertToWords() {
      this.outputEnglish = this.numberToEnglish(this.insertedNumber);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato&display=swap");

.wrap {
  background-color: #7a6bb5;
  padding: 30px;
  border-radius: 5px;
  font-family: "Lato", Helvetica, sans-serif;
  z-index: 1;
  @media screen and (max-width: 640px) {
    margin: 0 15px;
    padding: 15px;
  }
  h2 {
    font-size: 20px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-bottom: 20px;
    @media screen and (max-width: 640px) {
      font-size: 18px;
    }
  }
  label {
    font-size: 13px;
    display: block;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  input,
  textarea {
    display: block;
    margin: 0;
    padding: 12px 16px;
    width: 100%;
    max-width: 450px;
    font-size: 16px;
    line-height: 1;
    border: none;
    margin-bottom: 30px;
    border-radius: 5px;
    font-family: "Lato", Helvetica, sans-serif;
    box-sizing: border-box;
    transition: box-shadow 0.3s;
    &:focus {
      outline: none;
      box-shadow: 0px 5px 7px 0px rgba(76, 58, 144, 1);
    }
  }
  textarea {
    line-height: 20px;
    resize: none;
    margin-bottom: 15px;
    @media screen and (max-width: 640px) {
      margin-bottom: 5px;
    }
  }
}
</style>
