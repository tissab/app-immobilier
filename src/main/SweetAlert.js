import React from 'react'
import Swal from 'sweetalert2';

const type = ['info', 'success', 'warning', 'danger'];

const show = [false,true]

export const SweetAlert = (title, text, k,l) => {
   return Swal.fire({
        title: title,
        text: text,
        icon: type[k] === undefined ? type[0] : type[k] ,
        showCancelButton: show[l] === undefined ? show[0]: show[1],
        showConfirmButton: show[l] === undefined ? show[0]: show[1],
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Non',
        confirmButtonText: 'Oui'
      })
}

