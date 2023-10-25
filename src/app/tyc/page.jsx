/**
 * @author Erick Hernández Silva
 * @email hernandezsilvaerick@gmail.com
 * @create date 2023-10-19 12:56:23
 * @modify date 2023-10-19 12:56:23
 * @desc Página de términos y condiciones
 */

"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./tyc.module.css";
import styles from "./tyc.module.css";
import Link from "next/link";
import toast, { Toaster, ToastBar } from "react-hot-toast";
export default function TYC() {
  const [user, setuser] = useState(null); // Estado para guardar el identificador de usuario
  const searchParams = useSearchParams(); // Para buscar los query params
  const [accepted, setaccepted] = useState(false);

  useEffect(() => {
    if (!user) {
      const search = searchParams.get("q"); // Sacamos el identificador de usuario
      setuser(search); // Lo colocamos
    }
  }, []);

  // Función que hace una llamada a la API para aceptar los TyC
  function aceptarTyc() {
    const acceptTyc = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_backEnd + "auth/aceptar-tyc",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id: user,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setaccepted(true); // cambiamos el estado para mostrar el mensaje de exito
      }
      else{
        toast('Ocurrió un error, vuelve a intentarlo. Código: ' + data.error)
      }
    };
    // Ejecutamos la llamada a la api si y solo si tenemos un query param
    if (user != null) {
      acceptTyc();
    }
  }

  /*
    Regresamos los TyC si no se han aceptado, y regresamos la pantalla si ya están aceptados.
  */
  return !accepted ? (
    <div className="flex flex-col content-center items-center gap-10 min-h-screen justify-center pt-[7rem] pb-5">
      <Toaster position="bottom-center">
        {(t) => (
          <ToastBar
            toast={t}
            //style={{}} // Overwrite styles
            position="bottom-center" // Used to adapt the animation
          />
        )}
      </Toaster>
      <div className={` ${styles.test}`}>
        <p
          style={{
            paddingTop: "3pt",
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "left",
          }}
        >
          CONTRATO DE MUTUO CON INTERÉS Y GARANTÍA PRENDARIA (PRÉSTAMO) QUE
          CELEBRAN POR UNA PARTE EL <b>“PROVEEDOR” </b>CUYO NOMBRE APARECE EN EL
          RUBRO DE LA CARÁTULA, REPRESENTADO EN ESTE ACTO POR SU REPRESENTANTE
          LEGAL <b>RAUL ERNESTO NUÑEZ ESPINOZA, </b>Y POR LA OTRA, LA PERSONA
          CUYO NOMBRE Y DOMICILIO APARECE EN LA CARÁTULA, A QUIEN EN LO SUCESIVO
          Y PARA EFECTOS DEL PRESENTE CONTRATO SE LE DENOMINARÁ EL
          <b>“CONSUMIDOR”</b>; LAS PARTES SE SUJETAN AL TENOR DE LAS SIGUIENTES
          DECLARACIONES Y CLÁUSULAS:
        </p>
        <h1
          style={{ paddingLeft: "9pt", textIndent: "0pt", textAlign: "center" }}
        >
          D E C L A R A C I O N E S
        </h1>
        <h1
          style={{ paddingLeft: "9pt", textIndent: "0pt", textAlign: "center" }}
        >
          I.- Declara el “PROVEEDOR” que:
        </h1>
        <ol id="l1">
          <li data-list-text="A)">
            <p
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              Es una persona moral mexicana, según consta en la escritura
              pública Número 56,540 Vol. 2005, de fecha 26 De Septiembre De
              2017, pasada ante la fe del Licenciado Juan Carlos Bejarano Borboa
              en Mexicali Baja California, Notario Público número Dos en
              Mexicali Baja California e inscrita en el Registro Público de
              Comercio de Mexicali, Baja California, bajo el folio Mercantil
              A201705311536463963 de fecha 26 de Septiembre 2017, y que su
              representante legal acredita su personalidad mediante el
              testimonio notarial número 56,540 Vol. 2005 pasado ante la fe del
              Licenciado Juan Carlos Bejarano Borboa, Notario Público número
              Dos, en el Registro Público de Comercio de Mexicali Baja
              California, bajo el folio mercantil A201705311536463963de fecha 26
              de Septiembre 2017.
            </p>
          </li>
          <li data-list-text="B)">
            <p
              style={{
                paddingLeft: "18pt",
                textIndent: "-8pt",
                textAlign: "justify",
              }}
            >
              El domicilio, teléfono, Registro Federal de Contribuyentes y
              correo electrónico del PROVEEDOR se encuentran en la carátula del
              presente contrato.
            </p>
          </li>
          <li data-list-text="C)">
            <p
              style={{
                paddingLeft: "18pt",
                textIndent: "-8pt",
                lineHeight: "1",
                textAlign: "justify",
              }}
            >
              Cuenta con la capacidad, infraestructura, servicios, recursos
              necesarios y personal debidamente capacitado, para dar cabal
              cumplimiento a las obligaciones derivadas del presente contrato.
            </p>
          </li>
        </ol>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            lineHeight: "1",
            textAlign: "left",
          }}
        >
          II.- DECLARA “EL CONSUMIDOR” que:
        </h1>
        <ol id="l2">
          <li data-list-text="A)">
            <p
              style={{
                paddingLeft: "18pt",
                textIndent: "-7pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              Se llama como ha quedado plasmado en el proemio de este contrato.
            </p>
          </li>
          <li data-list-text="B)">
            <p
              style={{
                paddingLeft: "18pt",
                textIndent: "-8pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              Manifiesta su voluntad para obligarse en los términos y
              condiciones del presente contrato, y que cuenta con la capacidad
              legal para la celebración del mismo.
            </p>
          </li>
          <li data-list-text="C)">
            <p
              style={{
                paddingLeft: "18pt",
                textIndent: "-8pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              Su domicilio, teléfono y correo electrónico se encuentran
              señalados en la carátula del presente contrato.
            </p>
          </li>
          <li data-list-text="D)">
            <p
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "left",
              }}
            >
              Bajo protesta de decir verdad, es el legal, legítimo e
              indiscutible propietario de la prenda que entrega en garantía de
              este contrato, y de todo cuanto en derecho, uso y costumbre
              corresponde y que puede acreditar dicha calidad jurídica ante
              terceros y/o cualquier autoridad que lo requiera.
            </p>
            <p
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "left",
              }}
            >
              Expuesto lo anterior, las partes se sujetan al contenido de las
              siguientes:
            </p>
            <h1
              style={{
                paddingTop: "1pt",
                paddingLeft: "9pt",
                textIndent: "0pt",
                textAlign: "center",
              }}
            >
              C L Á U S U L A S
            </h1>
            <h1
              style={{
                paddingTop: "1pt",
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              1.- Objeto
              <span className="p">
                .- El PROVEEDOR entrega al CONSUMIDOR la cantidad de dinero en
                efectivo, equivalente al porcentaje de la valuación que se ha
                practicado a la prenda, en calidad de mutuo mercantil con
                interés y garantía prendaría (préstamo) y el CONSUMIDOR, se
                obliga, al término del contrato, a pagar al PROVEEDOR, la
                totalidad del préstamo, más los intereses, y las comisiones que
                se estipulan en la carátula del presente contrato.
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              2.<span className="p">- </span>Prenda.
              <span className="p">
                Con objeto de garantizar el cumplimiento de todas y cada una de
                las obligaciones derivadas de este contrato, e l CONSUMIDOR
                entregará al PROVEEDOR a título de prenda, el o los bienes
                muebles usados que se describen en la carátula del presente
                contrato, en el entendido de que esta entrega de ninguna manera
                convierte al PROVEEDOR en propietario de la prenda, ni implica
                el reconocimiento por parte de éste, de que tal bien sea
                propiedad del CONSUMIDOR ni compromete, ni limita los derechos
                que terceras personas pudieran tener sobre el mismo.
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              3.- Valor de la prenda.-
              <span className="p">
                El valor de la prenda es el que se plasma en la carátula del
                presente contrato, ambas partes reconocen que el mismo es
                resultado de un avalúo practicado por el PROVEEDOR, con la
                autorización y conformidad del CONSUMIDOR.
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                lineHeight: "1",
                textAlign: "justify",
              }}
            >
              4.- Obligaciones.
              <span className="p">
                El CONSUMIDOR y el PROVEEDOR aceptan y se obligan expresamente
                durante la vigencia del contrato a lo siguiente:
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              CONSUMIDOR.
            </h1>
            <ol id="l3">
              <li data-list-text="a)">
                <p
                  style={{
                    paddingLeft: "46pt",
                    textIndent: "-18pt",
                    lineHeight: "1",
                    textAlign: "left",
                  }}
                >
                  Cumplir con todas las obligaciones derivadas del presente
                  contrato.
                </p>
              </li>
              <li data-list-text="b)">
                <p
                  style={{
                    paddingLeft: "46pt",
                    textIndent: "-18pt",
                    textAlign: "left",
                  }}
                >
                  Notificar al PROVEEDOR, dentro de un plazo que no exceda de 10
                  días naturales, siguientes a partir de aquel en que haya
                  tenido conocimiento de la existencia de cualquier acción,
                  demanda, litigio o procedimiento en su contra, que comprometan
                  a la prenda.
                </p>
              </li>
              <li data-list-text="c)">
                <p
                  style={{
                    paddingLeft: "46pt",
                    textIndent: "-18pt",
                    textAlign: "left",
                  }}
                >
                  No enajenar, gravar, o comprometer los bienes entregados en
                  garantía prendaría, mientras esté vigente el presente
                  contrato.
                </p>
              </li>
              <li data-list-text="d)">
                <p
                  style={{
                    paddingLeft: "46pt",
                    textIndent: "-18pt",
                    textAlign: "left",
                  }}
                >
                  El CONSUMIDOR no podrá en ningún momento y por ningún motivo,
                  ceder, dar en prenda, o traspasar, a título gratuito, oneroso,
                  total o parcialmente los derechos y obligaciones que le
                  deriven de este contrato, ni el derecho a la propiedad o a la
                  posesión de los bienes otorgados en garantía prendaria
                  (prenda), sin el consentimiento expreso y por escrito del
                  PROVEEDOR<b>.</b>
                </p>
              </li>
            </ol>
          </li>
        </ol>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            lineHeight: "1",
            textAlign: "left",
          }}
        >
          PROVEEDOR.
        </h1>
        <ol id="l4">
          <li data-list-text="a)">
            <p
              style={{
                paddingLeft: "47pt",
                textIndent: "-18pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              A no usar el objeto otorgado en prenda como garantía del mutuo,
              por lo que únicamente tendrá la guarda y custodia de la prenda.
            </p>
          </li>
          <li data-list-text="b)">
            <p
              style={{
                paddingLeft: "47pt",
                textIndent: "-18pt",
                textAlign: "left",
              }}
            >
              Efectuar la guarda y custodia de la prenda en términos de lo
              dispuesto en el artículo 2876 fracción I del Código Civil Federal;
              en ningún caso será responsable de los daños y deterioros que
              pudiere sufrir por el simple transcurso del tiempo.
            </p>
          </li>
          <li data-list-text="c)">
            <p
              style={{
                paddingLeft: "47pt",
                textIndent: "-18pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              Deberá informar al CONSUMIDOR el Costo Anual Total (CAT), el Costo
              Mensual Total (CMT) y el Costo Diario Total (CDT) al momento de la
              celebración del presente contrato.
            </p>
          </li>
        </ol>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          5.- Defensa de la Prenda.-
          <span className="p">
            Si el PROVEEDOR fuere perturbado en la posesión de la prenda, por
            causas imputables al CONSUMIDOR, avisará por escrito a este último,
            en un plazo que no exceda de tres días naturales para que lleve a
            cabo las acciones legales pertinentes; si éste no cumpliere con esta
            obligación será responsable de todos los daños y perjuicios
            causados.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          6.- Reposición de la Prenda
          <span className="p">
            . Si en el cumplimiento de mandato legítimo de autoridad competente,
            el PROVEEDOR fuere desposeído de la prenda, el CONSUMIDOR le
            entregará a su entera satisfacción otra prenda equivalente en peso,
            calidad, contenido, modelo, marca y valor, dentro de los 10 días
            naturales siguientes a la notificación que por escrito haga el
            PROVEEDOR. En caso de omisión por parte del CONSUMIDOR a la
            mencionada notificación, desde este momento ambas partes acuerdan
            que sus derechos quedan a salvo para que éste último los haga valer
            en la forma y vía que considere convenientes.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          7.- Procedimiento para la Restitución de la Prenda para el Caso de
          Pérdida o Deterioro.
          <span className="p">
            En caso de pérdida o deterioro de la cosa dada en prenda, el
            PROVEEDOR deberá contar con una garantía suficiente que le permita
            resarcir el siniestro, debiendo seguir el siguiente procedimiento:
          </span>
        </h1>
        <ol id="l5">
          <li data-list-text="a)">
            <p
              style={{
                paddingLeft: "19pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              El PROVEEDOR deberá notificar al CONSUMIDOR, en un plazo que no
              exceda de 3 días naturales, siguientes de ocurrido el siniestro,
              por vía telefónica, correo electrónico, correo certificado, listas
              y/o anuncios publicados en el establecimiento del PROVEEDOR.
            </p>
          </li>
          <li data-list-text="b)">
            <p
              style={{
                paddingLeft: "53pt",
                textIndent: "-18pt",
                textAlign: "justify",
              }}
            >
              El CONSUMIDOR, deberá presentarse en el establecimiento donde
              firmó el contrato, en días y horas de servicio indicados en la
              carátula, o en el domicilio fiscal del PROVEEDOR, con la siguiente
              documentación:
            </p>
            <ol id="l6">
              <li data-list-text="1)">
                <p
                  style={{
                    paddingLeft: "40pt",
                    textIndent: "-7pt",
                    lineHeight: "1",
                    textAlign: "justify",
                  }}
                >
                  Contrato de adhesión,
                </p>
              </li>
              <li data-list-text="2)">
                <p
                  style={{
                    paddingLeft: "42pt",
                    textIndent: "-9pt",
                    lineHeight: "1",
                    textAlign: "justify",
                  }}
                >
                  Identificación del CONSUMIDOR, COTITULAR Y/O BENEFICIARIO.
                </p>
              </li>
            </ol>
          </li>
          <li data-list-text="c)">
            <p
              style={{
                paddingLeft: "19pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              El PROVEEDOR recibirá la documentación anterior, y le dará al
              consumidor un comprobante en el cual se hará la descripción de los
              documentos presentados, así como de la prenda motivo de la
              reclamación, misma que deberá coincidir con la establecida en el
              contrato, indicando el valor de la prenda conforme al avaluó
              practicado. El comprobante deberá de contener número de
              reclamación, razón social del proveedor, RFC., domicilio, nombre y
              firma de quien recibe la reclamación.
            </p>
            <p
              style={{
                paddingLeft: "5pt",
                textIndent: "0pt",
                lineHeight: "1",
                textAlign: "justify",
              }}
            >
              El PROVEEDOR se obliga a restituir o pagar la prenda, a elección
              del CONSUMIDOR, en el término de 10 días naturales siguientes a la
              entrega de la documentación por parte de este último.
            </p>
          </li>
          <li data-list-text="d)">
            <p
              style={{
                paddingLeft: "19pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              El PROVEEDOR pagará al CONSUMIDOR el valor de la prenda conforme
              al avalúo realizado y que está estipulado en la carátula de este
              contrato, del cual se disminuirá la cantidad entregada por
              concepto de mutuo, los intereses y el almacenaje que se hayan
              devengado hasta la fecha de ocurrido el siniestro y conforme a los
              porcentajes que se indica en la carátula. El PROVEEDOR podrá
              realizar el pago en efectivo o mediante la entrega de un bien
              equivalente en modelo, marca, calidad, contenido, peso y valor, a
              elección del CONSUMIDOR; en ambos casos el PROVEEDOR deberá pagar
              un 20% sobre el valor del avalúo, como pena convencional, siempre
              y cuando el siniestro haya ocurrido por negligencia de éste.
              Tratándose de metales preciosos, el valor de reposición del bien
              no podrá ser inferior al valor real que tenga el metal en el
              mercado al momento de la reposición.
            </p>
          </li>
        </ol>
        <ol id="l7">
          <li data-list-text={8}>
            <h1
              style={{
                paddingLeft: "12pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              Costo Anual Total (CAT).-
              <span className="p">
                Es el costo de financiamiento que para fines informativos y de
                comparación, incorpora la totalidad de los costos y gastos del
                préstamo. El referido Costo Anual Total se calculará utilizando
                la metodología establecida por el Banco de México, vigente en la
                fecha del cálculo respectivo.
              </span>
            </h1>
            <p
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              Para el cálculo del <b>Costo Mensual Total (CMT) </b>y del
              <b>Costo Diario Total (CDT) </b>se utilizará la misma metodología
              que se aplica para el cálculo del CAT establecida por el Banco de
              México, ajustando los valores de intervalo de tiempo que
              correspondan para el tipo de préstamo que se trate, vigente en la
              fecha del cálculo respectivo.
            </p>
            <h1
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              9.- Intereses.- Metodología cálculo de interés ordinario.-
              <span className="p">
                El préstamo causará una tasa de interés fija del porcentaje
                anual mencionado en la carátula, sobre saldos insolutos más el
                Impuesto al Valor Agregado (IVA) cuando corresponda; el cálculo
                de intereses se realizará multiplicando el saldo insoluto del
                préstamo, por la tasa de interés dividido entre 360 días por
                año, multiplicando por el número de días transcurridos. La tasa
                de interés así como su metodología de cálculo no podrán
                modificarse durante la vigencia del presente contrato.
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              10.- Comisiones.-
              <span className="p">
                El CONSUMIDOR se obliga, en su caso, a pagar al PROVEEDOR:
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "19pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              a).- <u>Comisión por Almacenaje:</u>
              <span className="p">
                El método de cálculo de comisión por almacenaje se realizará
                multiplicando el saldo insoluto del préstamo otorgado, por la
                tasa de almacenaje diaria que aparece en la carátula de este
                contrato, más el Impuesto al Valor Agregado, por el número de
                días efectivamente transcurridos.
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "19pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              b).- <u>Comisión por Comercialización:</u>
              <span className="p">
                Si el CONSUMIDOR no cumpliese con el pago oportuno de la
                obligación principal, intereses y comisiones estipuladas en el
                presente contrato, el PROVEEDOR procederá a comercializar el
                bien otorgado en garantía prendaría descrito en este contrato,
                con lo que el CONSUMIDOR queda obligado a pagar al PROVEEDOR una
                comisión por el porcentaje detallado en la carátula, sobre el
                monto del préstamo.
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "19pt",
                textIndent: "0pt",
                textAlign: "justify",
              }}
            >
              c).- <u>Comisión por Reposición del Contrato</u>.-
              <span className="p">
                El PROVEEDOR cobrará al CONSUMIDOR por Reposición de Contrato,
                el monto que se menciona en la carátula. La solicitud de
                reposición deberá hacerse por escrito y presentado
                identificación.
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "19pt",
                textIndent: "0pt",
                lineHeight: "1",
                textAlign: "justify",
              }}
            >
              d).- <u>Desempeño Extemporáneo</u>.-
              <span className="p">
                El PROVEEDOR cobrará al CONSUMIDOR por concepto de desempeño
                extemporáneo lo señalado en la carátula del presente contrato.
              </span>
            </h1>
            <p
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              El PROVEEDOR no podrá modificar las comisiones, ni la metodología
              de cálculo estipuladas en este contrato durante la vigencia del
              mismo.
            </p>
            <h1
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                textAlign: "left",
              }}
            >
              11.- Monto del préstamo
              <span className="p">
                .- El monto del préstamo es equivalente al porcentaje del valor
                del avalúo que se menciona en la carátula y el CONSUMIDOR se
                obliga a restituir dicha cantidad, más los intereses, almacenaje
                y comisiones en su caso.
              </span>
            </h1>
            <h1
              style={{
                paddingLeft: "10pt",
                textIndent: "0pt",
                lineHeight: "1",
                textAlign: "left",
              }}
            >
              12.- Causas de Terminación del contrato.-
              <span className="p">
                Serán causas de terminación del contrato:
              </span>
            </h1>
            <ol id="l8">
              <li data-list-text="a)">
                <h1
                  style={{
                    paddingLeft: "19pt",
                    textIndent: "1pt",
                    textAlign: "justify",
                  }}
                >
                  Pago del Préstamo.-
                  <span className="p">
                    En el plazo establecido en la carátula del presente contrato
                    el CONSUMIDOR deberá reintegrar el importe del mutuo,
                    conjuntamente con los intereses, almacenaje y las comisiones
                    pactadas en el contrato. El pago será hecho en el
                    establecimiento en que se suscribe el mismo, en moneda de
                    curso legal; cuando el término de la opción de pago
                    corresponda a un día inhábil, el pago deberá hacerse el
                    siguiente día hábil. Realizado el pago el CONSUMIDOR
                    recibirá la prenda en el mismo lugar en que la entregó,
                    otorgándose ambas partes el finiquito más amplio que en
                    derecho proceda.
                  </span>
                </h1>
              </li>
              <li data-list-text="b)">
                <h1
                  style={{
                    paddingLeft: "19pt",
                    textIndent: "1pt",
                    textAlign: "justify",
                  }}
                >
                  Pago Anticipado.-
                  <span className="p">
                    El CONSUMIDOR tendrá el derecho de cubrir el saldo total del
                    mutuo, sus intereses, almacenaje y demás comisiones
                    pactadas, antes del vencimiento del plazo establecido en la
                    carátula del presente contrato, conforme a las opciones de
                    pago descritas en éste, en cuyo caso el CONSUMIDOR deberá
                    presentarse en el establecimiento. Efectuado el pago se
                    procederá a la devolución de la prenda en el acto.
                  </span>
                </h1>
              </li>
            </ol>
          </li>
        </ol>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          13.- Comercialización de la Prenda.-
          <span className="p">
            Para el caso de que el CONSUMIDOR no cumpliera oportunamente con la
            obligación de restituir el mutuo, los intereses, almacenaje y demás
            comisiones pactadas en el contrato, en este acto se otorga
            expresamente a favor del PROVEEDOR un mandato aplicado a actos
            concretos de comercio, en los términos del artículo 273 del Código
            de Comercio, para que a título de comisionista en su nombre y
            representación y sin necesidad de agotar trámite alguno, efectúe la
            venta de la prenda, tomando como referencia el valor del avalúo
            estipulado en la cláusula tercera del presente contrato, sirviendo
            como notificación de la fecha de inicio de su comercialización la
            indicada en la carátula de este contrato. Para los efectos de la
            exención a que se refiere el artículo 9 fracción IV, de la Ley de
            Impuesto al Valor Agregado, el CONSUMIDOR reconoce explícitamente
            ser el enajenante de la prenda, que esta es usada y no tener la
            condición jurídica de empresa.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          14.- Aplicación del Producto de la Venta y Remanente.-
          <span className="p">
            EL CONSUMIDOR autoriza al PROVEEDOR a aplicar el producto de la
            venta de la prenda, al pago de la obligación principal, a los
            intereses, almacenaje, y comisión por comercialización. Si al
            realizar la venta o el remate de la prenda hubiera algún remanente,
            el mismo será puesto a disposición del CONSUMIDOR, a partir del
            tercer día siguiente a la comercialización de la prenda, para lo
            cual el PROVEEDOR dentro de dicho plazo, notificará por teléfono,
            correo electrónico, correo certificado y/o listas colocadas en el
            establecimiento respecto de la venta de la prenda. El remanente no
            cobrado en un lapso de doce meses calendario, contados a partir de
            la fecha de comercialización de la prenda quedará a favor del
            PROVEEDOR.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          15.- Desempeño Extemporáneo.-
          <span className="p">
            En caso de que la prenda no haya sido comercializada después de la
            “FECHA LIMITE DE REFRENDO O DESEMPEÑO”, tal como se señala en la
            carátula de este contrato, el CONSUMIDOR podrá recuperar la prenda
            previo acuerdo con el PROVEEDOR y pago del mutuo, de los intereses,
            almacenaje y las comisiones pactadas en el presente contrato.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          16.- Refrendo.-
          <span className="p">
            El CONSUMIDOR podrá refrendar el contrato, antes o en la fecha de su
            terminación, con el consentimiento del PROVEEDOR, siempre y cuando
            el CONSUMIDOR cubra el pago de los intereses, almacenaje y
            comisiones efectivamente devengadas al momento del refrendo. Al
            efectuarse el refrendo se firmará un nuevo contrato con intereses,
            almacenaje y comisiones aplicables al momento del refrendo.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          17.- Pena Convencional.-
          <span className="p">
            En caso de incumplimiento de cualquiera de las obligaciones a cargo
            del PROVEEDOR, éste pagará al CONSUMIDOR una pena convencional del
            20 % (veinte por ciento) sobre el monto del avalúo.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            lineHeight: "1",
            textAlign: "justify",
          }}
        >
          18.- Nulidad
          <span className="p">
            .- De haber alguna causal de nulidad determinada por autoridad
            competente, la misma afectará solamente a la cláusula en la que
            específicamente se hubiere incurrido en el vicio señalado.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          19.- Legitimidad.-
          <span className="p">
            Para el ejercicio de los derechos o el cumplimiento de los deberes a
            su cargo, el CONSUMIDOR o en su defecto su cotitular, beneficiario o
            representante legal, invariablemente deberán presentar al PROVEEDOR
            este contrato, así como una identificación expedida por autoridad
            competente, en el establecimiento donde suscribió el contrato, en
            los días y horas de servicio indicados en la carátula de este
            contrato. En caso de extravío del contrato, el CONSUMIDOR podrá
            tramitar su reposición solicitándolo por escrito y cubriendo el
            importe señalado en la carátula del mismo.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          20.- Confidencialidad.
          <span className="p">
            - Ambas partes convienen en que el acuerdo de voluntades que
            suscriben tiene el carácter de confidencial, por lo que el PROVEEDOR
            se obliga a mantener los datos relativos al CONSUMIDOR con tal
            carácter, y únicamente podrá ser revelada la información contenida
            en el mismo por mandamiento de autoridad competente; de igual forma
            se obliga a no ceder o transmitir a terceros con fines
            mercadotécnicos o publicitarios los datos e información
            proporcionada por el CONSUMIDOR con motivo del contrato, ni enviar
            publicidad sobre los bienes y servicios, salvo que conste la
            autorización expresa del CONSUMIDOR en la carátula del presente
            contrato.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          21.- Notificaciones.-
          <span className="p">
            Las partes acuerdan que cualquier notificación o aviso con motivo
            del contrato, deberá realizarse en los domicilios que se hayan
            establecido por las mismas, los cuales se indican en la carátula; de
            igual manera, las partes podrán efectuar avisos o comunicados
            mediante, teléfono, correo electrónico, correo certificado y/o
            listas colocadas en el establecimiento.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            lineHeight: "1",
            textAlign: "justify",
          }}
        >
          22.- Días Inhábiles
          <span className="p">
            .- Todas las obligaciones contenidas en este contrato, cuyo
            vencimiento tenga lugar en un día inhábil, deberá considerarse que
            el vencimiento de las mismas, será el día hábil siguiente.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          23.- Derecho Aplicable.-
          <span className="p">
            Este contrato se rige por lo dispuesto en la Ley Federal de
            Protección al Consumidor y su Reglamento, la Norma Oficial Mexicana
            NOM-179-SCFI-2007 Servicios de mutuo con interés y garantía
            prendaria, Disposiciones de carácter general a que se refiere la Ley
            para la Transparencia y Ordenamiento de los Servicios Financieros en
            materia de Contratos de Adhesión, Publicidad, Estados de Cuenta y
            Comprobantes de Operación emitidos por las Entidades Comerciales y
            demás ordenamientos aplicables.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          24.- Aclaraciones, Quejas o Reclamaciones
          <span className="p">
            .-En caso de aclaraciones, quejas o reclamaciones, el CONSUMIDOR
            deberá comunicarse al centro de atención del PROVEEDOR, al número
            telefónico o presentarse en el domicilio que se establece en la
            carátula. El PROVEEDOR deberá proporcionar un número de reporte al
            CONSUMIDOR, con el que se identificará la aclaración, queja o
            reclamación y se dará seguimiento al trámite, el cual será atendido
            en un tiempo no mayor a 10 días naturales.
          </span>
        </h1>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          25.- Jurisdicción.-
          <span className="p">
            Para todo lo relativo a la interpretación, aplicación y cumplimiento
            de este contrato, las partes acuerdan someterse en la vía
            administrativa a la Procuraduría Federal del Consumidor, y en caso
            de subsistir diferencias, a la jurisdicción de los tribunales
            competentes del lugar donde se celebra este contrato.
          </span>
        </h1>
        <p style={{ textIndent: "0pt", textAlign: "left" }}>
          <br />
        </p>
        <p
          style={{ paddingLeft: "10pt", textIndent: "0pt", textAlign: "left" }}
        >
          Leído que fue y una vez hecha la explicación de su alcance legal y
          contenido, este contrato fue suscrito por duplicado en el lugar y en
          la fecha que se indica en la carátula de este contrato, entregándosele
          una copia del mismo al CONSUMIDOR.
        </p>
        <p style={{ textIndent: "0pt", textAlign: "left" }}>
          <br />
        </p>
        <p style={{ textIndent: "0pt", textAlign: "left" }}>
          <br />
        </p>
        <h1
          style={{
            paddingLeft: "10pt",
            textIndent: "0pt",
            textAlign: "justify",
          }}
        >
          Este contrato fue aprobado y registrado por la Procuraduría Federal
          del Consumidor bajo el número 6115-2018 de 04 julio de 2018. Cualquier
          variación del presente contrato en perjuicio del CONSUMIDOR, frente al
          contrato de adhesión registrado, se tendrá por no puesta.
        </h1>
      </div>
      <div
        className="bg-black p-4 text-white w-full border border-black cursor-pointer text-center"
        onClick={(e) => {
          aceptarTyc(e);
        }}
      >
        Acepto los términos y condiciones
      </div>
    </div>
  ) : (
    <div className="flex flex-col content-center items-center gap-10 min-h-screen justify-center pt-[7rem] pb-5 text-center">
      <h1>Aceptaste nuestros términos y condiciones</h1>
      <div className="text-xl">Ya puedes hacer uso de nuestro servicio.</div>
      <Link
        href="https://api.whatsapp.com/send?phone=5215525392003"
        target="_blank"
        className="text-md underline"
      >
        Regresa a Whatsapp para continuar
      </Link>
    </div>
  );
}
