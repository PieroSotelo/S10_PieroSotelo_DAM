import { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { AppInput } from '../components/common/app-input';
import { AppButton } from '../components/common/app-button';

import {
  validarNombre,
  validarCorreo,
  validarEdad,
  validarEntrada,
} from '../utils/validators';

const entradas = [
  {
    id: 'general',
    nombre: 'Entrada general',
    detalle: 'Acceso a todas las actividades',
  },
  {
    id: 'vip',
    nombre: 'Entrada VIP',
    detalle: 'Acceso preferencial y zona exclusiva',
  },
  {
    id: 'estudiante',
    nombre: 'Entrada estudiante',
    detalle: 'Presenta tu carnet al ingresar',
  },
];

export default function Registro() {

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [edad, setEdad] = useState('');
  const [entrada, setEntrada] = useState('');

  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);

  const nombreValido = validarNombre(nombre);
  const correoValido = validarCorreo(correo);
  const edadValida = validarEdad(edad);
  const entradaValida = validarEntrada(entrada);

  const validarFormulario = () => {

    setError('');
    setRegistrado(false);

    if (!nombreValido) {
      setError('Ingresa tu nombre completo.');
      return;
    }

    if (!correoValido) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    if (!edadValida) {
      setError('Ingresa una edad válida entre 18 y 120 años.');
      return;
    }

    if (!entradaValida) {
      setError('Selecciona el tipo de entrada para continuar.');
      return;
    }

    setRegistrado(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ENCABEZADO */}

        <View style={styles.header}>

          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>
              +
            </Text>
          </View>

          <View>
            <Text style={styles.overline}>
              INSCRIPCIÓN AL EVENTO
            </Text>

            <Text style={styles.title}>
              Festival Conecta 2026
            </Text>
          </View>

        </View>


        <Text style={styles.description}>
          Reserva tu lugar y disfruta una experiencia inolvidable.
        </Text>


        {/* TARJETA DEL FORMULARIO */}

        <View style={styles.formCard}>

          <Text style={styles.sectionTitle}>
            Datos del asistente
          </Text>

          <Text style={styles.sectionDescription}>
            Completa tus datos para confirmar tu inscripción.
          </Text>


          {/* NOMBRE */}

          <AppInput
            label="Nombre completo"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChangeText={(value) => {
              setNombre(value);
              setError('');
              setRegistrado(false);
            }}
          />

          {nombre.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                nombreValido
                  ? styles.validText
                  : styles.invalidText,
              ]}
            >
              {nombreValido
                ? '✓ Nombre válido'
                : '○ Ingresa tu nombre'}
            </Text>
          )}


          {/* CORREO */}

          <AppInput
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={correo}
            onChangeText={(value) => {
              setCorreo(value);
              setError('');
              setRegistrado(false);
            }}
            keyboardType="email-address"
          />

          {correo.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                correoValido
                  ? styles.validText
                  : styles.invalidText,
              ]}
            >
              {correoValido
                ? '✓ Correo válido'
                : '○ Usa un formato como nombre@correo.com'}
            </Text>
          )}


          {/* EDAD */}

          <AppInput
            label="Edad"
            placeholder="Ingresa tu edad"
            value={edad}
            onChangeText={(value) => {
              setEdad(value);
              setError('');
              setRegistrado(false);
            }}
            keyboardType="numeric"
          />

          {edad.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                edadValida
                  ? styles.validText
                  : styles.invalidText,
              ]}
            >
              {edadValida
                ? '✓ Edad permitida'
                : '○ Debe ser un número entero entre 18 y 120'}
            </Text>
          )}

          <Text style={styles.inputLabel}>
            Tipo de entrada
          </Text>

          <Text style={styles.inputHint}>
            Selecciona una opción
          </Text>

          <View style={styles.ticketOptions}>
            {entradas.map((opcion) => {
              const seleccionada = entrada === opcion.id;

              return (
                <Pressable
                  key={opcion.id}
                  style={[
                    styles.ticketOption,
                    seleccionada && styles.ticketOptionSelected,
                  ]}
                  onPress={() => {
                    setEntrada(opcion.id);
                    setError('');
                    setRegistrado(false);
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: seleccionada }}
                >
                  <View style={styles.ticketText}>
                    <Text style={styles.ticketName}>
                      {opcion.nombre}
                    </Text>
                    <Text style={styles.ticketDetail}>
                      {opcion.detalle}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.radio,
                      seleccionada && styles.radioSelected,
                    ]}
                  >
                    {seleccionada && <View style={styles.radioDot} />}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {entrada.length > 0 && (
            <Text
              style={[
                styles.fieldStatus,
                entradaValida
                  ? styles.validText
                  : styles.invalidText,
              ]}
            >
              {entradaValida
                ? '✓ Entrada seleccionada'
                : '○ Selecciona una entrada'}
            </Text>
          )}


          {/* ERROR */}

          {error !== '' && (
            <View style={styles.errorBox}>

              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>
                  !
                </Text>
              </View>

              <View style={styles.messageContainer}>

                <Text style={styles.errorTitle}>
                  No se pudo guardar
                </Text>

                <Text style={styles.errorMessage}>
                  {error}
                </Text>

              </View>

            </View>
          )}


          {/* ÉXITO */}

          {registrado && (
            <View style={styles.successBox}>

              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>
                  ✓
                </Text>
              </View>

              <View style={styles.messageContainer}>

                <Text style={styles.successTitle}>
                  ¡Registro exitoso!
                </Text>

                <Text style={styles.successMessage}>
                  Todos los datos son válidos.
                </Text>

              </View>

            </View>
          )}


          {/* BOTÓN */}

          <AppButton
            title="Confirmar inscripción"
            onPress={validarFormulario}
          />

        </View>


        {/* VALIDACIONES */}

        <View style={styles.validationSection}>

          <View style={styles.validationHeader}>

            <View>
              <Text style={styles.validationTitle}>
                Validaciones
              </Text>

              <Text style={styles.validationSubtitle}>
                Reglas aplicadas al formulario
              </Text>
            </View>

            <View style={styles.counter}>

              <Text style={styles.counterText}>
                {
                  [
                    nombreValido,
                    correoValido,
                    edadValida,
                    entradaValida,
                  ].filter(Boolean).length
                }/4
              </Text>

            </View>

          </View>


          {/* VALIDACIÓN 1 */}

          <ValidationRow
            title="Nombre obligatorio"
            description="El campo no puede estar vacío."
            valid={nombreValido}
          />


          {/* VALIDACIÓN 2 */}

          <ValidationRow
            title="Correo electrónico"
            description="Debe contener un formato válido."
            valid={correoValido}
          />


          {/* VALIDACIÓN 3 */}

          <ValidationRow
            title="Edad válida"
            description="Debe ser un número entero entre 18 y 120."
            valid={edadValida}
          />

          <ValidationRow
            title="Entrada seleccionada"
            description="Debes elegir un tipo de entrada."
            valid={entradaValida}
          />

        </View>


        {/* PIE */}

        <Text style={styles.footer}>
          Inscripciones abiertas · Festival Conecta 2026
        </Text>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}


/* COMPONENTE PARA LAS VALIDACIONES */

type ValidationRowProps = {
  title: string;
  description: string;
  valid: boolean;
};

function ValidationRow({
  title,
  description,
  valid,
}: ValidationRowProps) {

  return (
    <View style={styles.validationRow}>

      <View
        style={[
          styles.validationCircle,
          valid
            ? styles.validationCircleValid
            : styles.validationCirclePending,
        ]}
      >

        <Text
          style={[
            styles.validationIcon,
            valid
              ? styles.validationIconValid
              : styles.validationIconPending,
          ]}
        >
          {valid ? '✓' : '○'}
        </Text>

      </View>


      <View style={styles.validationInfo}>

        <Text style={styles.validationRowTitle}>
          {title}
        </Text>

        <Text style={styles.validationRowDescription}>
          {description}
        </Text>

      </View>


      <View
        style={[
          styles.statusBadge,
          valid
            ? styles.statusBadgeValid
            : styles.statusBadgePending,
        ]}
      >

        <Text
          style={[
            styles.statusBadgeText,
            valid
              ? styles.statusBadgeTextValid
              : styles.statusBadgeTextPending,
          ]}
        >
          {valid ? 'OK' : 'Pendiente'}
        </Text>

      </View>

    </View>
  );
}


/* ESTILOS */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },

  scroll: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 35,
  },


  /* HEADER */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  headerIconText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '300',
  },

  overline: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 1.5,
    marginBottom: 3,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#172033',
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#667085',
    marginBottom: 24,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#172033',
    marginBottom: 5,
  },

  inputHint: {
    fontSize: 12,
    color: '#98A2B3',
    marginBottom: 10,
  },

  ticketOptions: {
    gap: 10,
    marginBottom: 14,
  },

  ticketOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    backgroundColor: '#FFFFFF',
  },

  ticketOptionSelected: {
    borderColor: '#4F46E5',
    backgroundColor: '#F5F3FF',
  },

  ticketText: {
    flex: 1,
    marginRight: 12,
  },

  ticketName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 3,
  },

  ticketDetail: {
    fontSize: 11,
    color: '#98A2B3',
  },

  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D0D5DD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioSelected: {
    borderColor: '#4F46E5',
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F46E5',
  },


  /* FORMULARIO */

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 4,
  },

  sectionDescription: {
    fontSize: 13,
    color: '#98A2B3',
    marginBottom: 22,
  },


  /* ESTADO DE CAMPOS */

  fieldStatus: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -10,
    marginBottom: 14,
  },

  validText: {
    color: '#16A34A',
  },

  invalidText: {
    color: '#D97706',
  },


  /* ERROR */

  errorBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  errorIconText: {
    color: '#DC2626',
    fontSize: 17,
    fontWeight: '800',
  },

  messageContainer: {
    flex: 1,
  },

  errorTitle: {
    color: '#991B1B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  errorMessage: {
    color: '#B42318',
    fontSize: 12,
    lineHeight: 17,
  },


  /* ÉXITO */

  successBox: {
    flexDirection: 'row',
    backgroundColor: '#F0FDF4',
    borderRadius: 14,
    padding: 13,
    marginBottom: 17,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },

  successIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  successIconText: {
    color: '#16A34A',
    fontSize: 17,
    fontWeight: '800',
  },

  successTitle: {
    color: '#166534',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 2,
  },

  successMessage: {
    color: '#15803D',
    fontSize: 12,
  },


  /* VALIDACIONES */

  validationSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },

  validationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  validationTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172033',
    marginBottom: 3,
  },

  validationSubtitle: {
    fontSize: 12,
    color: '#98A2B3',
  },

  counter: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterText: {
    color: '#4F46E5',
    fontSize: 14,
    fontWeight: '800',
  },


  /* FILAS */

  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
  },

  validationCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  validationCircleValid: {
    backgroundColor: '#DCFCE7',
  },

  validationCirclePending: {
    backgroundColor: '#F3F4F6',
  },

  validationIcon: {
    fontSize: 17,
    fontWeight: '800',
  },

  validationIconValid: {
    color: '#16A34A',
  },

  validationIconPending: {
    color: '#98A2B3',
  },

  validationInfo: {
    flex: 1,
  },

  validationRowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#344054',
    marginBottom: 3,
  },

  validationRowDescription: {
    fontSize: 11,
    color: '#98A2B3',
    lineHeight: 16,
  },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginLeft: 8,
  },

  statusBadgeValid: {
    backgroundColor: '#ECFDF3',
  },

  statusBadgePending: {
    backgroundColor: '#F2F4F7',
  },

  statusBadgeText: {
    fontSize: 9,
    fontWeight: '800',
  },

  statusBadgeTextValid: {
    color: '#027A48',
  },

  statusBadgeTextPending: {
    color: '#667085',
  },


  /* FOOTER */

  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#98A2B3',
    marginTop: 22,
  },

});