import { IonContent, IonHeader, IonPage, IonTitle } from "@ionic/react";
import { useState } from "react";
import DateRangeSelector from "../components/hacerInforme/calendar";
import PreviewTable from "../components/hacerInforme/previewTable";

function HacerInforme() {
  const [fechaInicio, setFechaInicio] = useState<string | null>(null);
  const [fechaFin, setFechaFin] = useState<string | null>(null);

  const handleDatesSelected = (startDate: string, endDate: string) => {
    setFechaInicio(startDate);
    setFechaFin(endDate);
  };

  return (
    <IonPage>
      <IonHeader translucent={false}>
        <IonTitle>
          <h1>Hacer informes</h1>
        </IonTitle>
      </IonHeader>
      <IonContent>
        <div className="container mt-2">
          <div className="row">
            {/* Calendar Section */}
            <div className="col-12 col-lg-4 mb-3">
              <h2>Seleccionar Fechas</h2>
              <div className="form-group form-control-sm">
                <DateRangeSelector onDatesSelected={handleDatesSelected} />
              </div>
              <div>
                <h3>Fechas Seleccionadas</h3>
                <p>Fecha Inicio: {fechaInicio || "No seleccionada"}</p>
                <p>Fecha Fin: {fechaFin || "No seleccionada"}</p>
              </div>
            </div>

            {/* Preview Table Section */}
            <div className="col-12 col-lg-7 ms-lg-1">
              <h2>Previsualización</h2>
              <PreviewTable fechaInicio={fechaInicio} fechaFin={fechaFin} />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default HacerInforme;