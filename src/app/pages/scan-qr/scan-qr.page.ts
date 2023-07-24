import { AfterViewInit, Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { InteraccionesService } from '../../services/interacciones.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})

export class ScanQrPage implements AfterViewInit{
  scanActive = false;
  scanResult = null;
  @ViewChild('video', {static: false}) video: ElementRef;
  @ViewChild('canvas', {static: false}) canvas: ElementRef;
  @ViewChild('fileinput', {static: false}) fileinput: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;
  loading: HTMLIonLoadingElement;

  rut: string;
  usuario : any;
  
  constructor(
    private toastCtrl: ToastController, 
    private loadingCtrl: LoadingController, 
    private plt: Platform,
    private activatedRoute: ActivatedRoute, 
    private usuarioService: UsuarioService,
    private interaction: InteraccionesService) {

//implementacion de captación QR codigo
      const isInStandaloneMode = () =>
      'standalone' in window.navigator && window.navigator['standalone'];
      if (this.plt.is('ios') && isInStandaloneMode())
      {
        console.log('I am an iOS PWA!');
        // E.g hide the scan functionality!
      }
    }

    // async checkPermission() {
    //   try {
    //     // verificar o solicitar permisos
    //     const status = await BarcodeScanner.checkPermission({ force: true });
    //     if (status.granted) {
    //       // el usuario concedió permiso
    //       return true;
    //     }
    //     return false;
    //   } catch(e) {
    //     console.log(e);
    //   }
    // }

    ngOnInit() {
      this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
      this.usuario = this.usuarioService.getUsuario(this.rut);
      console.table(this.usuario);
    }

  ngAfterViewInit()
  {
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  //Metodo que abre una imagen desde el dispositivo
  captureImage()
  {
    this.fileinput.nativeElement.click();
  }

  handleFile()
  {

  }

  //Metodo para iniciar el escaner QR
  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environmet'}
      // video: { facingMode: { exact: "environment" } } 
    });
    this.videoElement.srcObject = stream;
    this.videoElement.setAttribute('playsinline', true);
    this.videoElement.play();
    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();
    requestAnimationFrame(this.scan.bind(this));
  }

  //Metodo que al presionar escanear buesca en todo momento el QR
  async scan()
  {
    console.log('Escaneando...');
    
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA)
    {  
      if (this.loading)
      {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }
      
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;
      
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height,
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height,
      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, 
        {
          inversionAttempts: 'dontInvert'
        });
        console.log('code:', code);

        if (code) 
        {
          this.scanActive = false;
          this.scanResult = code.data,
          console.log('marca asistencia');
          this.usuarioService.marcarAsistencia(code.data, this.usuario);
          console.log('termina marca asistencia');
          this.interaction.presentToastExito('Código QR escaneado con exito, ¡Ya estas presente!')
          //this.showQrToast();
        } 
        else 
        {
          if (this.scanActive)
          {
            requestAnimationFrame(this.scan.bind(this));
          }
        }
    } 
    else 
    {
      requestAnimationFrame(this.scan.bind(this));
    }
  }


  //Metodo que detiene el escaner en pantalla
  stopScan()
  {
    this.scanActive = false;
  }

  //Metodo que reinicia el escaner
  reset()
  {
    this.scanResult = null;
  }

  //Metodo que muestra notificación de si desea abrir el enlace desde el navegador
  async showQrToast()
  {
    const toast = await this.toastCtrl.create(
      {
      message: '¿Desea abrir el enlace en el navegador?' ,
      position: 'top',
      buttons: [
        {
          role: 'cancel',
          icon: 'close',
          handler: () => {
          },
        },
        {
          text: 'Abrir',
          handler: () =>
          {
            window.open(this.scanResult, '_system', 'location=yes')
          }
        },
      ],
        });
    toast.present();
    return;
  }
}