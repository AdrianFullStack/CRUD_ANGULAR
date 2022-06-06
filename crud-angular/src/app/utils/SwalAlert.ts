import Swal from "sweetalert2";

export class SwalAlert {
  private static show(title = 'Cargando...'): void {
    if (!Swal.isVisible()) {
      Swal.fire({
        title: title,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    }
  }

  public static showLoadding() {
    return this.show();
  }

  public static showCreate() {
    return this.show('Guardando, espere...');
  }

  public static showUpdate() {
    return this.show('Actualizando, espere...');
  }

  public static showSearch() {
    return this.show('Buscando, espere...');
  }

  public static showDelete(
    callback: any,
    title = '¿Estas seguro de eliminar?',
    text = 'Una vez eliminado, no podrá recuperar la información!',
    showProcessing = true
  ) {
    if (!Swal.isVisible()) {
      Swal.fire({
        title,
        html: `<sub>${text}</sub>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        customClass: {
          title: 'swal2-title-custom'
        }
      }).then((result) => {
        if (result.value) {
          if (showProcessing) {
            Swal.fire({
              title: 'Procesando, espere...',
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              }
            });
          }
          callback();
        }
      });
    }
  }

  public static close() {
    if (Swal.isVisible())
      Swal.close();
  }
}
