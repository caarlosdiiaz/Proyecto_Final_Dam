import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { registrosDataAlumnos } from "../templates/interfaces templates";

const createPdf = async (alumnos: registrosDataAlumnos[]) => {
  try {
    const doc = new jsPDF();

    const logoGob = `${window.location.origin}/images/LogoGOBCAN.png`;
    const logoIES = `${window.location.origin}/images/LogoIES.png`;
    const infoIES = `${window.location.origin}/images/InfoIES.png`;

    doc.setFont("helvetica", "normal");

    const header = () => {
      doc.addImage(logoIES, "PNG", 10, 10, 40, 30);
      doc.addImage(logoGob, "PNG", 70, 10, 60, 30);
      doc.addImage(infoIES, "PNG", 140, 15, 40, 30);
      doc.setFontSize(12);
      doc.text("Informe de Registros", 10, 50);
    };

    autoTable(doc, {
      head: [["Nombre del alumno", "Clase", "Cantidad de veces ida al baño"]],
      body: alumnos.map((alumno) => [alumno.nombre, alumno.curso, alumno.cantidad]),
      startY: 60,
      didDrawPage: header,
    });

    setTimeout(() => {
      doc.save(`informeAlumnos.pdf`);
    }, 1000);
  } catch (error) {
    console.error("Error al crear el PDF:", error);
  }
};

export default createPdf;